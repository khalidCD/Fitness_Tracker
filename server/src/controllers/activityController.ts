import { Request, Response } from "express";
import { AppDataSource } from "../data/source";
import { Activity } from "../entity/activity.entity";

export const saveActivity = async (req: Request, res: Response) => {
  const { username, steps, water } = req.body;
  const activityRepo = AppDataSource.getRepository(Activity);

  try {    const existingActivity = await activityRepo.findOne({ where: { username } });
    
    let activityToSave;

    if (existingActivity) {
      existingActivity.steps = steps;
      existingActivity.water = water;
      activityToSave = existingActivity;
    } else {
      activityToSave = activityRepo.create({ username, steps, water });
    }

    const savedActivity = await activityRepo.save(activityToSave);
    return res.status(200).json(savedActivity);

  } catch (error) {
    console.error("Error saving activity:", error);
    return res.status(500).json({ message: "Error saving activity" });
  }
};

export const getActivityByDate = async (req: Request, res: Response) => {
  const { username} = req.params;
  const activityRepo = AppDataSource.getRepository(Activity);
  try {
    const activity = await activityRepo.findOne({ where: { username } });
    if (activity) {
      return res.json(activity);
    } else {
      return res.json({ steps: 0, water: 0 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error getting activity" });
  }
};