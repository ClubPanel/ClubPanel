export interface ConfigInfo {
  name: string;
  default: string;
}

export const configs: ConfigInfo[] = [];

export const RegisterConfig = (info: ConfigInfo) => {
  configs.push(info);
}