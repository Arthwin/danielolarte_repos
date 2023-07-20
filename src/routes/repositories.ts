import { Router } from "express";
import {
  getRepositories
} from "../controllers/repositories";

const router = Router();

// GET all
router.get("/", getRepositories);

export default router;
