import express from "express";
import next from "next";
import {LoadModules} from "../shared/module/moduleLoader";
import * as database from "./database/database";
import {GetConfig} from "../shared/config/configStore";
import session from "express-session";
import {MainConfig} from "../shared/config/types/mainConfig";
import {RequireBaseReferrer} from "./util/referrer";
import {Module} from "../shared/module/module";
import {IUser} from "./database/models/user";

declare module "express-session" {
  export interface SessionData {
    user?: IUser;
  }
}

const app = next({ dev: process.argv[2] === "dev" });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  await database.Setup();

  const modules = await LoadModules(true);

  registerRoutes(server, modules);

  for (const module of modules) {
    if(!module.server?.register) continue;

    module.server.register(server);
  }

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(80, () => {
    console.log("> Ready on http://localhost:80");
  });
}).catch((ex) => {
  console.error(ex);
  process.exit(1);
});

const registerRoutes = (server: express.Express, modules: Module[]) => {
  const config = GetConfig<MainConfig>("server/main.json");

  server.use(session(config.cookie));

  server.get("/userinfo", RequireBaseReferrer(), (req, res) => {
    const output = {
      username: null,
      userId: null
    };

    if(!req.session) {
      res.status(200);
      res.send(output);

      return;
    }

    if(req.session.user) {
      output.username = req.session.user.username;
      output.userId = req.session.user.id;
    }

    for (const module of modules) {
      if(!module.server?.events?.getUserInfo) continue;

      const data = module.server.events.getUserInfo(req.session) || {};
      const keys = Object.keys(data);

      for (const key of keys) {
        output[key] = keys[key];
      }
    }

    res.status(200);
    res.send(output);
  });
};