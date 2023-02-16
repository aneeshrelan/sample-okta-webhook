import express from "express";
import { logger } from "./logger";
import { authorizer, requestLogger } from "./middleware";
import appRouter from "./routes/authRoutes";

const app = express();

const PORT = Number(process.env.PORT || "3000");

app.use("/", requestLogger);

app.get("/open", (req, res) => {
  return res.send("It works!");
});

app.use("/auth", authorizer, appRouter);

app.listen(PORT, () => {
  logger.info("Server started", { PORT });
});
