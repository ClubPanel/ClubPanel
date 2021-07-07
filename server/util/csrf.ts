import crypto from "crypto";
import express from "express";
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    csrfToken?: string;
  }
}

/**
 * An express middleware that requires the body of a request to contain the CSRF token. This should be used after a body parser middleware.
 */
export const requireCSRF = () => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(req.body?.hasOwnProperty?.("csrf") && req.body?.csrf === getCSRF(req.session)) next();
    else res.status(403).send("A CSRF token was not provided, or it is invalid.");
  };
};

export const getCSRF = (session: session.SessionData) => {
  if(!session.csrfToken) {
    session.csrfToken = crypto.randomBytes(32).toString("hex");
  }

  return session.csrfToken;
};