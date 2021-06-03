import { MainConfig } from "./mainConfig";

export const mainConfig: MainConfig = require("../../../config/main.json");
export function GetKeyMain<T>(key: string) : T {
  return mainConfig[key] as T;
}