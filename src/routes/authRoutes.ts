import { Router } from "express";

const appRouter = Router();

appRouter.use("/webhook", (req, res) => {
  return res.json({
    req,
  });
});

export default appRouter;
