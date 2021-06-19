import {Config} from "./types/config";
import {configs as configNames, RegisterConfig} from "./configFilesManager";
import * as fs from "fs";
import * as Path from "path";

let configs: Record<string, Config> = {};

RegisterConfig({name: "main.json", default: fs.readFileSync(Path.join("./shared/config/configs", "main.json"), "utf-8")});

export const ReloadConfigs = () => {
  if(!fs.existsSync("./config")) fs.mkdirSync("./config");

  for (let configName of configNames) {
    const path = Path.join("./config", configName.name);

    if(!configName.isText) {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(JSON.parse(configName.default), null, 4));
      }

      let parsed: object;
      try {
        parsed = JSON.parse(fs.readFileSync(path, "utf-8"));
      } catch (e) {
        throw new Error("Error loading " + configName.name + ": " + e.message);
      }

      const defaultConfig = JSON.parse(configName.default);

      validateConfig(path, parsed, defaultConfig);

      configs[Path.basename(configName.name)] = parsed;
    } else {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, configName.default);
      }

      let value: string;
      try {
        value = fs.readFileSync(path, "utf-8");
      } catch (e) {
        throw new Error("Error loading " + configName.name + ": " + e.message);
      }

      configs[Path.basename(configName.name)] = value;
    }
  }
}

const validateConfig = (path: string, config: object, defaultConfig: object) => {
  let flag = false;

  for (let key of Object.keys(defaultConfig)) {
    if(!config.hasOwnProperty(key)) {
      flag = true;

      config[key] = defaultConfig[key];
    }
  }

  for(let key of Object.keys(config)) {
    if(!defaultConfig.hasOwnProperty(key)) {
      flag = true;

      delete config[key];
    }
  }

  if(flag){
    fs.writeFileSync(path, JSON.stringify(config, null, 4));
  }
}

export function GetConfig<T>(config: string) : T {
  return configs[config] as T;
}

ReloadConfigs();