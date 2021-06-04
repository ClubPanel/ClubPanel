import {Express} from "express";

export interface Module {
  server?: ServerSide;
  client?: ClientSide;
  configs?: ConfigHandler;
}

export interface ServerSide {
  register?: (express: Express) => void;
}

export interface ClientSide {
  register?: (callback: ClientRegisterCallback) => void;
}

export interface ConfigHandler {
  register: () => void;
}

export type ClientRegisterCallback = (path: string, props: object) => void;