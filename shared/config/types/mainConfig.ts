import {Config} from "./config";
import {SessionOptions} from "express-session";
import {IMenuLink} from "../../../components/menu/IMenuLink";

export interface MainConfigClient extends Config {
  name: string;
  domain: string;
  sidebar: Record<string, IMenuLink[]>;
}

export interface MainConfigServer extends Config {
  dbURL: string;
  cookie: SessionOptions;
}