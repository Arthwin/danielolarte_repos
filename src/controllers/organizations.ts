import { Request, Response } from "express";
import Organization from "../models/Organization";
import * as err from "../config/errorMessages";

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    // Get all organizations
    const organizations = await Organization.findAll();
    res.json({ organizations });
  } catch (error) {
    res.status(500).json({ error: err.internalServerErrorMessage });
  }
};

export const getOrganizationById = async (req: Request, res: Response) => {
  try {
    // Get organization by id
    const { id } = req.params;
    const organization = await Organization.findByPk(id);
    if (organization) res.json({ organization }); // Check existence
    else
      res.status(404).json({
        msg: err.recordIdInexistentErrorMessage,
      });
  } catch (error) {
    res.status(500).json({ error: err.internalServerErrorMessage });
  }
};

export const createOrganization = async (req: Request, res: Response) => {
  try {
    // Post organization
    const { body } = req;

    // Prevent the user from entering an "id" field
    delete body.id;

    const orgExists = await Organization.findOne({
      where: {
        name: body.name,
      },
    });
    if (orgExists)
      // Check existence
      return res.status(400).json({
        msg: err.recordNameExistsErrorMessage,
      });
    const organization = await Organization.create(body);
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: err.internalServerErrorMessage });
  }
};

export const updateOrganizationById = async (req: Request, res: Response) => {
  try {
    // Update organization
    const { id } = req.params;
    const { body } = req;

    const organization = await Organization.findByPk(id);
    if (!organization)
      // Check existence of ID
      return res.status(404).json({
        msg: err.recordIdInexistentErrorMessage,
      });

    const orgExists = await Organization.findOne({
      where: {
        name: body.name,
      },
    });

    if (orgExists)
      // Check existence of name
      return res.status(400).json({
        msg: err.recordNameExistsErrorMessage,
      });

    await organization.update(body);
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: err.internalServerErrorMessage });
  }
};

export const deleteOrganizationById = async (req: Request, res: Response) => {
  try {
    // Delete organization by id
    const { id } = req.params;

    const organization = await Organization.findByPk(id);

    if (!organization)
      // Check existence
      return res.status(404).json({
        msg: err.recordIdInexistentErrorMessage,
      });

    // Soft delete
    // await organization.update({status: 0});

    // Hard delete
    // await organization.destroy();

    const organizations = await Organization.findAll();
    res.json({ organizations });
  } catch (error) {
    res.status(500).json({ error: err.internalServerErrorMessage });
  }
};
