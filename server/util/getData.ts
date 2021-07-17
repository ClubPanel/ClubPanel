import {UserInfo} from "../database/models/user";
import {SessionData} from "express-session";

export const dataFunctions: Record<string, (userInfo: UserInfo, session: SessionData, params: object) => object | Promise<object>> = {};

/**
 * Registers a data function path. This will run the specified function on a request to generate the data object for that request
 * if the given path pattern matches the request path.
 * @param path {string} - is the path pattern used to determine if the function should run. Supports express-like syntax.
 * @param func {(userInfo: UserInfo, session: SessionData, params: object) => object | Promise<object>} - is the function that will run to generate the data object.
 */
export const RegisterDataPath = (path: string, func: (userInfo: UserInfo, session: SessionData, params: object) => object | Promise<object>) => {
  if(dataFunctions.hasOwnProperty(path)) throw new Error("Error: Data function path \"" + path + "\" registered twice!");
  dataFunctions[path] = func;
};