import {Express} from "express";
import {SessionData} from "express-session";
import {ClientProps} from "../../lib/moduleHelpers";
import {RenderProps} from "../../pages/[[...name]]";

export interface Module {
  priority?: number;
}

export interface ServerSide extends Module {
  register?: (express: Express) => void;
  events?: ServerSideEvents;
}

export interface ServerSideEvents {
  getUserInfo?: (session: SessionData) => Record<string, any>;
}

export interface ClientSide extends Module {
  register?: (callback: ClientRegisterCallback) => void;
  configs?: string[];
  events?: ClientSideEvents;
}

export interface ClientSideEvents {
  preRender?: (props: { props: ClientProps & { module: string, component: string } }) => void;
  render?: (props: RenderProps) => void;
}

export interface ConfigHandler {
  register: () => void;
}

export type ClientRegisterCallback = (path: string, props: object, component?: string) => void;