import { Request, Response } from "express";
import { Op } from "sequelize";

import * as err from "../config/errorMessages";
import callMockVerificationApi from "../middleware/mockVerificationApi";
import { jsonToCsv } from "../utils/convertJsonToCsv";

import Tribe from "../models/Tribe";
import Repository from "../models/Repository";
import Metrics from "../models/Metrics";
import Organization from "../models/Organization";
import Verification from "../models/Verification";

export const getMetricsByTribeId = async (req: Request, res: Response) => {
  try {
    // Tribe
    const { tribeId } = req.params;

    const tribe = await Tribe.findByPk(tribeId);

    if (!tribe) {
      res.status(404).json({
        msg: err.tribuNoRegistradaErrorMessage,
      });
      return;
    }

    // Organization
    const organization = await Organization.findByPk(tribe.id_organization);

    if (!organization) {
      res.status(404).json({
        msg: err.recordIdInexistentErrorMessage,
      });
      return;
    }

    // Repositories
    const currentYear = new Date().getFullYear();
    /*
      Retornará el detalle de las métricas de los repositorios creados este año
      Y que se encuentren habilitados (state: ENABLE)
      Y que su cobertura sea superior a 75%
    */
    const pullRepositories = await Repository.findAll({
      where: {
        id_tribe: tribeId,
        state: "E",
        create_time: {
          [Op.gte]: new Date(`${currentYear}-01-01`),
          [Op.lt]: new Date(`${currentYear + 1}-01-01`),
        },
      },
      include: [
        {
          model: Metrics,
          where: {
            coverage: {
              [Op.gt]: 0.75,
            },
          },
        },
      ],
    });

    if (!pullRepositories || pullRepositories.length === 0) {
      res.status(404).json({
        msg: err.tribuNoReposErrorMessage,
      });
      return;
    }

    // External mock verification api
    const verification = await callMockVerificationApi();
    if (
      !verification ||
      !verification.repositories ||
      verification.repositories.length == 0
    ) {
      res.status(404).json({
        msg: err.recordIdInexistentErrorMessage,
      });
      return;
    }

    // Transform and map new object
    const repoVerificationMapping: { [key: string]: string } = {
      604: "Verificado",
      605: "En espera",
      606: "Aprobado",
      default: "Desconocida",
    };
    const repoStateMapping: { [key: string]: string } = {
      E: "Habilitado",
      D: "Deshabilitado",
      default: "Desconocido",
    };

    const repositories = pullRepositories.map((repoData: Repository) => {
      const foundVerification = verification.repositories.find(
        (repos: Verification) => repos.id === repoData.id_repository
      ); // Assume mock api gave the correct response
      const repoVerificationValue =
        repoVerificationMapping[foundVerification.state || 605];
      const repoStateValue = repoStateMapping[repoData.state];

      // Creating the transformed object for the current repository
      const transformedRepo = {
        id: repoData.id_repository,
        name: repoData.name,
        tribe: tribe.name,
        organization: organization.name,
        coverage: (repoData.metric.coverage * 100 || 0) + "%",
        codeSmells: repoData.metric.code_smells || 0,
        bugs: repoData.metric.bugs || 0,
        vulnerabilities: repoData.metric.vulnerabilities || 0,
        hotspots: repoData.metric.hotspot || 0,
        verificationState: repoVerificationValue,
        state: repoStateValue,
      };

      return transformedRepo;
    });

    res.json({ repositories });
  } catch (error) {
    res.status(500).json({ error: err.internalServerErrorMessage });
  }
};

export const getMetricsCsvByTribeId = async (req: Request, res: Response) => {
  try {
    // Call the getMetricsByTribeId function and capture the result using a temporary response object.
    const tempRes: any = {
      json: (result: any) => {
        // Assuming the getMetricsByTribeId function returns the metrics in JSON format,
        // Send the same JSON response as the result of getMetricsCsvByTribeId.

        const csvData = jsonToCsv(result.repositories);

        const filename = "repositories.csv";

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}"`
        );

        res.status(200).send(csvData);
      },
      status: (code: number) => res.status(code),
    };

    await getMetricsByTribeId(req, tempRes);
  } catch (error) {
    res.status(500).json({ error: err.internalServerErrorMessage });
  }
};
