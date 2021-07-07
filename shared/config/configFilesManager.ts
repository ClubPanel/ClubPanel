/**
 * An interface for the data needed to register a config file.
 */
export interface ConfigInfo {
  /**
   * The path of the config, relative to the configs directory. Configs for the server should be prefixed with `server/`, and configs
   * for the client should be prefixed with `client/`. The server has access to all config files, but the client only has access to
   * config files in the client directory. Any sensitive data (such as secrets) should be placed inside of server configs.
   */
  name: string;
  /**
   * The default value for the config. If this is an object, all of its keys are guaranteed to exist on the config object, and they will be the same type as in the default.
   */
  default: object | string;
}

export const configs: ConfigInfo[] = [];

/**
 * A method used to register a config file.
 * @param info {ConfigInfo} - is the config info for the config file being registered.
 */
export const RegisterConfig = (info: ConfigInfo) => {
  configs.push(info);
}