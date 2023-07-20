import { Request, Response } from "express";
import { Sequelize, Op } from "sequelize";

import Tribe from "../models/Tribe";
import Repository from "../models/Repository";
import Metrics from "../models/Metrics";
import Organization from "../models/Organization";
import makeMockApiRequest from "./mockApi";
import Verification from "../models/Verification";

export const getMetricsByTribeId = async (req: Request, res: Response) => {
  // wrap in try catch *********

  const { tribeId } = req.params;

  const tribe = await Tribe.findByPk(tribeId);

  if (!tribe) {
    res.status(404).json({
      msg: `La Tribu no se encuentra registrada`,
    });
    return;
  }

  const organization = await Organization.findByPk(tribe.id_organization);

  if (!organization) {
    res.status(404).json({
      msg: `Could't find organization for the tribe with ID: ${tribeId}`,
    });
    return;
  }

  // Get the current year
  const currentYear = new Date().getFullYear();

  const pullRepositories = await Repository.findAll({
    where: {
      id_tribe: tribeId,
      state: "E",
      create_time: {
        [Op.gte]: new Date(`${currentYear - 10}-01-01`), //******************************************************************************************************************** */
        [Op.lt]: new Date(`${currentYear + 1}-01-01`),
      },
    },
    include: [
      {
        model: Metrics,
        where: {
          coverage: {
            [Op.gt]: 0.1, //******************************************************************************************************************** */
          },
        },
      },
    ],
  });

  if (!pullRepositories || pullRepositories.length === 0) {
    res.status(404).json({
      msg: `La Tribu no tiene repositorios que cumplan con la cobertura necesaria`, // missing conditional if calculation fails ******************
    });
    return;
  }

  // external mock api
  const verification = await makeMockApiRequest();
  if (
    !verification ||
    !verification.repositories ||
    verification.repositories.length == 0
  ) {
    res.status(404).json({
      msg: `Could't find verification for the tribe with ID: ${tribeId}`,
    }); // might want to default to 0s
    return;
  }

  // transform and map to new object
  const repositories = pullRepositories.map((repoData: Repository) => {
    const repoId = repoData.id_repository;
    const repoName = repoData.name;
    const repoState = repoData.state;

    // Calculated fields
    const tribeName = tribe.name.toString();
    const orgName = organization.name;
    const repoMetrics = repoData.metric as Metrics;
    const repoCoverage = repoMetrics.coverage * 100 || 0;
    const repoCodeSmells = repoMetrics.code_smells || 0;
    const repoBugs = repoMetrics.bugs || 0;
    const repoVulnerabilities = repoMetrics.vulnerabilities || 0;
    const repoHotspots = repoMetrics.hotspot || 0;

    const foundRepo = verification.repositories.find(
      (repos: Verification) => repos.id === repoId
    );
    const repoVerification = foundRepo?.state || 605;

    // State fields
    const repoStateMapping: { [key: string]: string } = {
      E: "Habilitado",
      D: "Deshabilitado",
    };
    const repoStateValue = repoStateMapping[repoState] || "Estado Desconocido";
    const repoVerificationMapping: { [key: string]: string } = {
      604: "Verificado",
      605: "En espera",
      606: "Aprobado",
    };
    const repoVerificationValue =
      repoVerificationMapping[repoVerification] || "Verificación Desconocida";

    // Creating the transformed object for the current repository
    const transformedRepo = {
      id: repoId,
      name: repoName,
      tribe: tribeName,
      organization: orgName,
      coverage: repoCoverage + "%",
      codeSmells: repoCodeSmells,
      bugs: repoBugs,
      vulnerabilities: repoVulnerabilities,
      hotspots: repoHotspots,
      verificationState: repoVerificationValue,
      state: repoStateValue,
    };

    return transformedRepo;
  });

  /*
detalle de las métricas de los repositorios creados este año
Y que se encuentren habilitados (state: ENABLE)
Y que su cobertura sea superior a 75%
*/

  // enums pa estado api externa
  res.json({ repositories });
};

export const getMetricsCsvByTribeId = async (req: Request, res: Response) => {
  // Call the getMetricsByTribeId function and capture the result using a temporary response object.
  const tempRes: any = {
    json: (result: any) => {
      // Assuming the getMetricsByTribeId function returns the metrics in JSON format,
      // you can simply send the same JSON response as the result of getMetricsCsvByTribeId.

      const csvData = jsonToCsv(result.repositories);
      const filename = "repositories.csv";

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.status(200).send(csvData);

      //res.json({ res: result, msg: "csv" + req.params.tribeId });
    },
    status: (code: number) => res.status(code),
  };
  await getMetricsByTribeId(req, tempRes);
};

// Function to convert JSON to CSV
function jsonToCsv(data: any[]): string {
  const csvRows: string[] = [];
  const headers = Object.keys(data[0]);

  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map((header) => {
      let cellValue = row[header];
      if (typeof cellValue === 'string' && cellValue.includes(',')) {
        cellValue = `"${cellValue}"`; // Escape quotes for strings containing commas
      }
      return cellValue;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}
