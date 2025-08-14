import { Router } from "express";
import { register, login } from "../controllers/authController";
import { savePersonal, getPersonalByUsername } from "../controllers/personalController";
import { saveGoals, getGoalsByUsername } from "../controllers/goalsController";
import { saveActivity, getActivityByDate } from "../controllers/activityController";

const router = Router();
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/personal", savePersonal);
router.get("/personal/:username", getPersonalByUsername);
router.post("/goals", saveGoals);
router.get("/goals/:username", getGoalsByUsername);
router.post("/activity", saveActivity);
router.get("/activity/:username/:date", getActivityByDate);

export default router;