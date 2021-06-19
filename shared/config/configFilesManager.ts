export interface ConfigInfo {
  name: string;
  default: string;
  isText?: boolean;
}

export const configs: ConfigInfo[] = [];

export const RegisterConfig = (info: ConfigInfo) => {
  info.isText ||= false;

  configs.push(info);
}