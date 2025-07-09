import express from "express";
import {
  createleads,
  deleteLead,
  getallleads,
  getSingleLead,
  updateleads,
} from "../controller/Leadcontrollers.js";
import { loginUser, logoutUser, registerUser } from "../controller/Usercontrollers.js";
const router = express.Router();

// Leads
router.post("/leads", createleads);
router.put("/leads/:id", updateleads);
router.get("/leads", getallleads);
router.get("/leads/:id", getSingleLead);
router.delete("/leads/:id", deleteLead);

// User
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.post("/users/logout/:id", logoutUser);

// router.post('/signup',signup);

export default router;
