import {Express} from "express";
import {SessionData} from "express-session";
import {Module} from "./module";
import {UserInfo} from "../../server/database/models/user";

export interface ServerSide extends Module {
  register?: (express: Express) => void;
  events?: ServerSideEvents;
}

export interface ServerSideEvents {
  getUserInfo?: (session: SessionData) => UserInfo | Promise<UserInfo>;
  getData?: (path: string, userInfo: UserInfo) => object | Promise<object>;
}