import express from "express";
import next from "next";
import {LoadModules} from "../shared/module/moduleLoader";
import * as database from "./database/database";
import {GetConfig} from "../shared/config/configStore";
import session, {SessionData} from "express-session";
import {MainConfigServer} from "../shared/config/types/mainConfig";
import {ServerSide} from "../shared/module/moduleServer";
import User, {IUser, UserInfo} from "./database/models/user";
import {ServerResponse} from "http";
import {MatchURLPattern} from "../shared/util/url";
import {dataFunctions} from "./util/getData";
import * as https from "https";
import * as fs from "fs";

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

  const config = GetConfig<MainConfigServer>("server/main.json");

  server.use(session(config.cookie));

  //This is done to force a reload of everything every request. For example, if a person has permission removed,
  //it will not be reflected until the next login without this.
  server.use(async (req, res, next) => {
    if(!req.session?.user) return next();

    try {
      req.session.user = await User.findOne({id: req.session.user.id});
    } catch(e) {
      console.error(e);
      req.session.user = null;
      req.session.destroy((e1) => {
        if(e1) {
          console.error(e1);
        }
      });
    }

    next();
  });

  const modules = await LoadModules<ServerSide>("server", true);

  for (const module of modules) {
    module?.register?.(server, modules);
  }

  server.get("*", async (req, res) => {
    req["userInfo"] = await getUserInfo(req, modules);
    req["moduleData"] = await getData(req, modules, req["userInfo"]);

    return handle(req, <ServerResponse>res);
  });

  if(!config.enableSSL) {
    server.listen(config.port, () => {
      console.log("> Ready on http://localhost:" + config.port);
    });
  } else {
    https.createServer({
      key: fs.readFileSync(config.SSLKey),
      cert: fs.readFileSync(config.SSLCert)
    }, server).listen(config.port);

    console.log("> Ready on http://localhost:" + config.port);
  }
}).catch((ex) => {
  console.error(ex);
  process.exit(1);
});

const getUserInfo = async (req: express.Request, modules: ServerSide[]) : Promise<UserInfo> => {
  const output = {
    email: null,
    username: null,
    permissions: [],
    userId: null
  };

  if(!req.session) {
    return output;
  }

  if(req.session.user) {
    output.email = req.session.user.email;
    output.username = req.session.user.username;
    output.permissions = req.session.user.permissions;
    output.userId = req.session.user.id;
  }

  for (const module of modules) {
    const data = await module?.events?.getUserInfo?.(req.session) || {};

    Object.assign(output, data);
  }

  return output;
};

const getData = async (req: express.Request, modules: ServerSide[], userInfo: UserInfo) : Promise<object> => {
  const output = await getDataFromDataFunctions(req.path, userInfo, req.session);

  for (const module of modules) {
    const data = await module?.events?.getData?.(req.path, userInfo, req.session) || {};

    Object.assign(output, data);
  }

  return output;
};

const getDataFromDataFunctions = async (path: string, userInfo: UserInfo, session: SessionData) : Promise<object> => {
  const output: object = {};

  for (const key of Object.keys(dataFunctions)) {
    const params = MatchURLPattern(path, key);
    if(!params) continue;

    Object.assign(output, await dataFunctions[key](userInfo, session, params));
    break;
  }

  return output;
};