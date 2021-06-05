import express from "express";
import {IUser} from "../database/models/user";

declare module "express-session" {
  export interface SessionData {
    user?: IUser;
  }
}

const authReqs: {req: AuthReq, priority: number}[] = [];

export const registerAuthReq = (callback: AuthReq, priority = 0) => {
  authReqs.push({req: callback, priority});

  authReqs.sort((a, b) => b.priority - a.priority);
};

export type AuthReq = () => boolean;

export const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  for (const authReq of authReqs) {
    if(authReq.req()) return;
  }

  next();
};