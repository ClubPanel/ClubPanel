import express from "express";
import {hasPermission} from "../../shared/util/permissions";
import {IUser} from "../database/models/user";

declare module "express-session" {
  export interface SessionData {
    user?: IUser;
  }
}

export const requirePermission = (...permissionArr: (string | string[])[]) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(hasPermission(req.session?.user?.permissions, ...permissionArr)) next();
    else res.status(403).send("You do not have the required permissions to access this resource.");
  };
};