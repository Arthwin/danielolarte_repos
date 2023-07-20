import { Request, Response } from "express";
import Organization from "../models/Organization";
// import { body, check, validationResult } from "express-validator";

export const getOrganizations = async (req: Request, res: Response) => {
  const organizations = await Organization.findAll();
  res.json({ organizations });
};

export const getOrganizationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organization = await Organization.findByPk(id);
  if (organization) res.json({ organization });
  else
    res.status(404).json({
      msg: `Could't find an organization with ID: ${id}`,
    });
};

export const createOrganization = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    /* await check("email", "Email is not valid").isEmail().run(body.);
    await check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
    await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);*/

    // what if they try to input an id

    const orgExists = await Organization.findOne({
      where: {
        name: body.name,
      },
    });
    if (orgExists)
      return res.status(400).json({
        msg: "An organization with that name already exists: " + body.nombre,
      });
    const organization = await Organization.create(body);
    res.json(organization);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error creating record, talk to an admin.",
    });
  }
};

export const updateOrganizationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const organization = await Organization.findByPk(id);

    if (!organization)
      return res.status(404).json({
        msg: "Could not find an organization with the ID: : " + id,
      });

    const orgExists = await Organization.findOne({
      where: {
        name: body.name,
      },
    });
    if (orgExists)
      return res.status(400).json({
        msg: "An organization with that name already exists: " + body.nombre,
      });
    // what if they try to update the id?
    await organization.update(body);
    res.json(organization);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error updating record, talk to an admin.",
    });
  }
};

export const deleteOrganizationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const organization = await Organization.findByPk(id);

  if (!organization)
    return res.status(404).json({
      msg: "Could not find an organization with the ID: : " + id,
    });

  // await organization.update({status: 0});
  // await organization.destroy();
  // res.json(organization);

  const organizations = await Organization.findAll();
  res.json({ organizations });
};
