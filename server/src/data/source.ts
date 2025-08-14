import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entity/user.entity";
import { Personal } from "../entity/personal.entity";
import { Goals } from "../entity/goals.entity";
import { Activity } from "../entity/activity.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port:Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: false,
  entities: [User, Personal, Goals, Activity],
});
