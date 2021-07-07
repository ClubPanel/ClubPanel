import express from "express";
import {GetConfig} from "../../shared/config/configStore";
import {MainConfigClient} from "../../shared/config/types/mainConfig";

/**
 * An express middleware used to require the referrer of a request to be this site. Useful for preventing CSRF in conjunction with `requireCSRF`.
 */
export const requireBaseReferrer = () => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const configs = GetConfig<MainConfigClient>("client/main.json");

    if(!req.header("Referrer") || new URL(req.header("Referrer")).hostname !== configs.domain) {
      res.status(403);
      res.send("This resource can only be accessed from the same site it exists on.");

      return;
    }
    next();
  };
};