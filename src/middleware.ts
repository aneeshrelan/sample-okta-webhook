import { Request, Response, NextFunction } from "express";
import OktaJwtVerifier from "@okta/jwt-verifier";
import { logger } from "./logger";

const jwtVerifier = new OktaJwtVerifier({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.OKTA_CLIENT_ID,
});

const audience = "api://default";

export const authorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    return res.status(401).send();
  }

  try {
    const accessToken = match[1];
    if (!accessToken) {
      return res.send(401);
    }
    await jwtVerifier.verifyAccessToken(accessToken, audience);
    return next();
  } catch (err) {
    return res.status(401).send((err as Error).message);
  }
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(req.url, { method: req.method, url: req.url });
  return next();
};
