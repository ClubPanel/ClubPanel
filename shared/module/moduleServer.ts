import {Express} from "express";
import {SessionData} from "express-session";
import {Module} from "./module";
import {UserInfo} from "../../server/database/models/user";

export interface ServerSide extends Module {
  register?: RegisterServerSideType;
  events?: ServerSideEvents;
}

export type RegisterServerSideType = (express: Express) => void;

export interface ServerSideEvents {
  getUserInfo?: GetUserInfoType;
  getData?: GetDataType;
}

export type GetUserInfoType = (session: SessionData) => UserInfo | Promise<UserInfo>;
export type GetDataType = (path: string, userInfo: UserInfo) => object | Promise<object>;