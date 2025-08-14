import { Request, Response } from "express";
import { AppDataSource } from "../data/source";
import { Goals } from "../entity/goals.entity";

const repo = () => AppDataSource.getRepository(Goals);

export const saveGoals = async (req: Request, res: Response) => {
  const { username, steps, runningkm, sleephours, targetweight, waterliters } =
    req.body;

  try {
    let goals = await repo().findOne({ where: { username } });

    if (goals) {
      Object.assign(goals, {
        steps,
        runningkm,
        sleephours,
        targetweight,
        waterliters,
      });
    } else {
      goals = repo().create({
        username,
        steps,
        runningkm,
        sleephours,
        targetweight,
        waterliters,
      });
    }

    res.status(200).json(await repo().save(goals));
  } catch (err) {
    console.error("Error in saveGoals:", err);
    res.status(500).json({ message: "Error saving goals", error: err });
  }
};

export const getGoalsByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const goals = await repo().findOne({ where: { username } });
    res.json(
      goals || {
        steps: 0,
        runningkm: 0,
        sleephours: 0,
        targetweight: 0,
        waterliters: 0,
      }
    );
  } catch (error) {
    console.error("Error in getGoalsByUsername:", error);
    res.status(500).json({ message: "Server error" });
  }
};
