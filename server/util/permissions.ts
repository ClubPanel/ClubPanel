import express from "express";
import {hasPermission} from "../../shared/util/permissions";
import {IUser} from "../database/models/user";

declare module "express-session" {
  export interface SessionData {
    user?: IUser;
  }
}

/**
 * An express middleware to require users to have a specific permission before accessing a resource.
 * @param permissionArr {(string | string[])[]} - is the required permissions list, identical to the one in `hasPermission`.
 */
export const requirePermission = (...permissionArr: (string | string[])[]) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(hasPermission(req.session?.user?.permissions, ...permissionArr)) next();
    else res.status(403).send("You do not have the required permissions to access this resource.");
  };
};