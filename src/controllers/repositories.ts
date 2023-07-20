import { Request, Response } from "express";
import Repository from "../models/Repository";

export const getRepositories = async (req: Request, res: Response) => {
  const repositories = await Repository.findAll({
    attributes: [["id_repository","id"], "state"],
  });
  res.json({ repositories });
};
