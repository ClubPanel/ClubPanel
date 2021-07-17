import {UserInfo} from "../database/models/user";
import {SessionData} from "express-session";
import Path from "path";

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

/**
 * Joins multiple parts of a path together, for usage in the path argument of RegisterDataPath.
 * @param parts {...string} - is the parts of the path that will be joined together.
 * @returns {string} - The joined path.
 */
export const JoinPath = (...parts: string[]) : string => {
  return Path.join(...parts).replace(/\\/g, "/");
};