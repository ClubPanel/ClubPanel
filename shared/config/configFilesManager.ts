export interface ConfigInfo {
  name: string;
  default: object | string;
}

export const configs: ConfigInfo[] = [];

export const RegisterConfig = (info: ConfigInfo) => {
  configs.push(info);
}