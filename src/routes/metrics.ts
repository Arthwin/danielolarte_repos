import { Router } from "express";
import {
  getMetricsByTribeId,
  getMetricsCsvByTribeId
} from "../controllers/metrics";

const router = Router();

// GET metrics based on tribe
router.get("/tribe/:tribeId", getMetricsByTribeId);


// GET CSV metrics based on tribe
router.get("/tribe/:tribeId/csv", getMetricsCsvByTribeId);

export default router;
