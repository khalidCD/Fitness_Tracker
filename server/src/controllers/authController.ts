import { Request, Response } from "express";
import { AppDataSource } from "../../src/data/source";
import { User } from "../entity/user.entity";

const userRepo = () => AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const repo = userRepo();
    const existing = await repo.findOne({ where: [{ username }, { email }] });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already taken" });
    }
    const saved = await repo.save(repo.create({ username, email, password }));
    const { password: _p, ...safeUser } = saved;
    return res.status(201).json({ success: true, user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password required" });
  }

  try {
    const repo = userRepo();
    const user = await repo.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const { password: _p, ...safeUser } = user;
    return res.json({ success: true, user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};