import {Express} from "express";
import {SessionData} from "express-session";

export interface Module {
  server?: ServerSide;
  client?: ClientSide;
  configs?: ConfigHandler;
  priority?: number;
}

export interface ServerSide {
  register?: (express: Express) => void;
  events?: ServerSideEvents;
}

export interface ServerSideEvents {
  getUserInfo?: (session: SessionData) => Record<string, any>;
}

export interface ClientSide {
  register?: (callback: ClientRegisterCallback) => void;
  configs?: string[];
  events?: ClientSideEvents;
}

export interface ClientSideEvents {

}

export interface ConfigHandler {
  register: () => void;
}

export type ClientRegisterCallback = (path: string, props: object, component?: string) => void;