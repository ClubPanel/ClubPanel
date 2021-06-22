import {Config} from "./types/config";

export const configs: Record<string, any> = {};

export function GetConfig<T>(config: string, otherConfigs?: Record<string, Config>) : T {
  return (otherConfigs || configs)[config] as T;
}