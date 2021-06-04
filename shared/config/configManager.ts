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

    if(!fs.existsSync(path)) {
      fs.writeFileSync(path, configName.default);
    }

    configs[Path.basename(configName.name, ".json")] = JSON.parse(fs.readFileSync(path, "utf-8"));
  }
}

export function GetKey<T>(config: string, key: string) : T {
  return configs[config][key] as T;
}

ReloadConfigs();