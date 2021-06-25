import express from "express";
import next from "next";
import {LoadModules} from "../shared/module/moduleLoader";
import * as database from "./database/database";
import {GetConfig} from "../shared/config/configStore";
import session from "express-session";
import {MainConfigServer} from "../shared/config/types/mainConfig";
import {ServerSide} from "../shared/module/moduleServer";
import {IUser, UserInfo} from "./database/models/user";
import {ServerResponse} from "http";

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

  const modules = await LoadModules<ServerSide>("server", true);

  registerRoutes(server, modules);

  for (const module of modules) {
    module?.register?.(server);
  }

  server.get("*", (req, res) => {
    req["userInfo"] = getUserInfo(req, modules);

    return handle(req, <ServerResponse>res);
  });

  server.listen(80, () => {
    console.log("> Ready on http://localhost:80");
  });
}).catch((ex) => {
  console.error(ex);
  process.exit(1);
});

const registerRoutes = (server: express.Express, modules: ServerSide[]) => {
  const config = GetConfig<MainConfigServer>("server/main.json");

  server.use(session(config.cookie));
};

const getUserInfo = (req: express.Request, modules: ServerSide[]) : UserInfo  => {
  const output = {
    username: null,
    permissions: [],
    userId: null
  };

  if(!req.session) {
    return output;
  }

  if(req.session.user) {
    output.username = req.session.user.username;
    output.permissions = req.session.user.permissions;
    output.userId = req.session.user.id;
  }

  for (const module of modules) {
    const data = module?.events?.getUserInfo?.(req.session) || {};
    const keys = Object.keys(data);

    for (const key of keys) {
      output[key] = keys[key];
    }
  }

  return output;
};