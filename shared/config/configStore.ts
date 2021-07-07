import {Config} from "./types/config";

export const configs: Record<string, any> = {};

/**
 * A method used to get information in a config file.
 * @param config {string} - is the path of the config file, relative to the configs directory.
 * @param otherConfigs {Record<string, Config>} - is an optional config object that will be used in place of the default one, required for getting configs on the client.
 * @returns {T} The config as an object, cast to the type specified.
 */
export function GetConfig<T>(config: string, otherConfigs?: Record<string, Config>) : T {
  return (otherConfigs || configs)[config] as T;
}