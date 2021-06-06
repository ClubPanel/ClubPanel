import express from "express";

const authReqs: {req: AuthReq, priority: number}[] = [];

export const registerAuthReq = (callback: AuthReq, priority = 0) => {
  authReqs.push({req: callback, priority});

  authReqs.sort((a, b) => b.priority - a.priority);
};

export type AuthReq = (req: express.Request, res: express.Response) => boolean;

export const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  for (const authReq of authReqs) {
    if(authReq.req(req, res)) return;
  }

  next();
};