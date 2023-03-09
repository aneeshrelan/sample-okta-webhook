import { Router } from "express";

const appRouter = Router();

appRouter.use("/webhook", (req, res) => {
  return res.json({ success: true, message: "Event received successfully" });
});

export default appRouter;
