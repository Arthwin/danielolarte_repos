import { Request, Response } from "express";
import { internalServerErrorMessage } from "../config/errorMessages";

export const getRepoVerification = async (req: Request, res: Response) => {
  try {
    // Simulated external API call for repository verification
    const repositories = [
      {
        id: 1,
        state: 604,
      },
      {
        id: 2,
        state: 605,
      },
      {
        id: 3,
        state: 606,
      },
    ];
    res.json({ repositories });
  } catch (error) {
    res.status(500).json({ error: internalServerErrorMessage });
  }
};
