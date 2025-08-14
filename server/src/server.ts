import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data/source";
import apiRoutes from "./routes";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api", apiRoutes);

const PORT = Number(process.env.PORT);

AppDataSource.initialize()
  .then(() => {
    console.log("TypeORM DataSource initialized");
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
