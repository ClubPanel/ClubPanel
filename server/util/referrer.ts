import express from "express";
import {GetConfig} from "../../shared/config/configStore";
import {MainConfig} from "../../shared/config/types/mainConfig";

export const RequireBaseReferrer = () => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const configs = GetConfig<MainConfig>("main.json");

    if(!req.header("Referrer") || new URL(req.header("Referrer")).hostname !== configs.domain) {
      res.status(403);
      res.send("This resource can only be accessed from the same site it exists on.");

      return;
    }
    next();
  };
};