import {Config} from "./config";
import {SessionOptions} from "express-session";

export interface MainConfig extends Config {
  name: string;
  dbURL: string;
  cookie: SessionOptions;
}