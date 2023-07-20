import { Router } from "express";
import { getRepoVerification } from "../controllers/verification";

const router = Router();

// GET all
router.get("/", getRepoVerification);

export default router;
