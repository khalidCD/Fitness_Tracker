import { Request, Response } from "express";
import { AppDataSource } from "../data/source";
import { Personal } from "../entity/personal.entity";

export const savePersonal = async (req: Request, res: Response) => {
  const { username, fullname, location, dob, height, weight } = req.body;
  const personalRepo = AppDataSource.getRepository(Personal);

  try {
    let personal = await personalRepo.findOne({ where: { username } });
    if (personal) {
      personal.fullname = fullname;
      personal.location = location;
      personal.dob = dob;
      personal.height = height;
      personal.weight = weight;
    } else {
      personal = personalRepo.create({
        username,
        fullname,
        location,
        dob,
        height,
        weight,
      });
    }
    const savedPersonal = await personalRepo.save(personal);
    return res.status(200).json(savedPersonal);
  } catch (err) {
    console.error("Error in savePersonal:", err);
    return res
      .status(500)
      .json({ message: "Error saving personal details", error: err });
  }
};

export const getPersonalByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const personalRepo = AppDataSource.getRepository(Personal);
  try {
    const personal = await personalRepo.findOne({ where: { username } });
    if (!personal) {
      return res.status(404).json({ message: "Personal details not found" });
    }
    return res.json(personal);
  } catch (error) {
    console.error("Error in getPersonalByUsername:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
