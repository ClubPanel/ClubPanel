import express from "express";

declare module "express-session" {
  export interface SessionData {
    lastURL?: string;
  }
}

const authReqs: {req: AuthReq, priority: number}[] = [];

export const registerAuthReq = (callback: AuthReq, priority = 0) => {
  authReqs.push({req: callback, priority});

  authReqs.sort((a, b) => b.priority - a.priority);
};

export type AuthReq = (req: express.Request, res: express.Response) => boolean;

export const requireAuth = () => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.session.lastURL = req.url;

    for (const authReq of authReqs) {
      if(authReq.req(req, res)) return;
    }

    next();
  };
};

export const requireCurrentAuth = () => {
  const reqs = Object.assign([], authReqs);

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.session.lastURL = req.url;

    for (const authReq of reqs) {
      if(authReq.req(req, res)) return;
    }

    next();
  };
};