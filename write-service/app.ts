import express, { Application } from "express";
import sequelize from "@src/sequelize";

import CustomerRouter from "@src/routes/CustomerRouter";
import logger from "@src/utils/logger";
import { errorHandler } from "@src/middlewares/ErrorMiddleware";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function initialize() {
  try {
    await sequelize.sync({ force: false }); // Sync the models with the database
  } catch (error) {
    logger.error("Error initializing Sequelize:", error);
  }
}
initialize().then(() => {
  logger.info("Initialized Sequelize");
});
app.use("/api/customers", CustomerRouter);
app.use(errorHandler);
const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
