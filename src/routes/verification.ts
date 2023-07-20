import { Router } from "express";
import {
  getVerification
} from "../controllers/verification";

const router = Router();

// GET all
router.get("/", getVerification);

export default router;
