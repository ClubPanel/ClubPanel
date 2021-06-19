import {Express} from "express";

export interface Module {
  server?: ServerSide;
  client?: ClientSide;
  configs?: ConfigHandler;
  priority?: number;
}

export interface ServerSide {
  register?: (express: Express) => void;
}

export interface ClientSide {
  register?: (callback: ClientRegisterCallback) => void;
  configs?: string[];
}

export interface ConfigHandler {
  register: () => void;
}

export type ClientRegisterCallback = (path: string, props: object, component?: string) => void;