import { Router } from "express";
import {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganizationById,
  deleteOrganizationById,
} from "../controllers/organization";

const router = Router();

// GET all organizations
router.get("/", getOrganizations);

// GET organization by ID
router.get("/:id", getOrganizationById);

// POST a new organization
router.post("/", createOrganization);

// PUT (update) organization by ID
router.put("/:id", updateOrganizationById);

// DELETE organization by ID
router.delete("/:id", deleteOrganizationById);

export default router;
