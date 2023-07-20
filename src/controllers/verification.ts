import { Request, Response } from "express";
import { internalServerErrorMessage } from "../config/errorMessages";

export const getRepoVerification = async (req: Request, res: Response) => {
  try {
    // Simulated external API call for repository verification
    const repositories = [
      { id: 1, state: 605 },
      { id: 2, state: 604 },
      { id: 3, state: 606 },
      { id: 4, state: 606 },
      { id: 5, state: 606 },
      { id: 6, state: 606 },
      { id: 7, state: 605 },
      { id: 8, state: 605 },
      { id: 9, state: 606 },
      { id: 10, state: 604 },
      { id: 11, state: 604 },
      { id: 12, state: 604 },
      { id: 13, state: 604 },
      { id: 14, state: 605 },
      { id: 15, state: 605 },
      { id: 16, state: 606 },
      { id: 17, state: 605 },
      { id: 18, state: 606 },
      { id: 19, state: 606 },
      { id: 20, state: 605 },
      { id: 21, state: 604 },
      { id: 22, state: 606 },
      { id: 23, state: 605 },
      { id: 24, state: 606 },
      { id: 25, state: 604 },
      { id: 26, state: 604 },
      { id: 27, state: 604 },
      { id: 28, state: 606 },
      { id: 29, state: 604 },
      { id: 30, state: 606 },
    ];

    res.json({ repositories });
  } catch (error) {
    res.status(500).json({ error: internalServerErrorMessage });
  }
};
