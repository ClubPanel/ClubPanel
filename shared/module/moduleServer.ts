import {Express} from "express";
import {SessionData} from "express-session";
import {Module} from "./module";
import {UserInfo} from "../../server/database/models/user";

/**
 * The base interface for doing things server-side.
 */
export interface ServerSide extends Module {
  /**
   * A method called when routes can be added to the express server.
   */
  register?: RegisterServerSideType;
  /**
   * An interface allowing the module to register for events.
   */
  events?: ServerSideEvents;
}

/**
 * A method called when routes can be added to the express server.
 * @param express {Express} - is the express server.
 */
export type RegisterServerSideType = (express: Express) => void;

/**
 * An interface allowing modules to listen to server-events.
 */
export interface ServerSideEvents {
  /**
   * An event called when a userinfo request is made, allowing modules to send custom userinfo data to the client.
   */
  getUserInfo?: GetUserInfoType;
  /**
   * An event called when a page is requested, used to send custom data to a page.
   * Anything added here is available in the `moduleData` property in a page component.
   */
  getData?: GetDataType;
}

/**
 * An event called when a userinfo request is made, allowing modules to send custom userinfo data to the client.
 * @param session {SessionData} - is the session data sent along with the request.
 * @returns {Partial<UserInfo> | Promise<Partial<UserInfo>>} The data in the custom user info.
 */
export type GetUserInfoType = (session: SessionData) => Partial<UserInfo> | Promise<Partial<UserInfo>>;
/**
 * An event called when a page is requested, used to send custom data to a page.
 * Anything added here is available in the `moduleData` property in a page component.
 * @param path {string} - is the path that the request is being made from.
 * @param userInfo {UserInfo} - is the user info that will be sent to the client, containing information like a user's permissions.
 * @returns {object | Promise<object>} An object whose properties will be added to the data sent to the client.
 */
export type GetDataType = (path: string, userInfo: UserInfo) => object | Promise<object>;