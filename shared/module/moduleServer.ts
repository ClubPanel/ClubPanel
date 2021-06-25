import {Express} from "express";
import {SessionData} from "express-session";
import {Module} from "./module";

export interface ServerSide extends Module {
  register?: (express: Express) => void;
  events?: ServerSideEvents;
}

export interface ServerSideEvents {
  getUserInfo?: (session: SessionData) => Record<string, any>;
}