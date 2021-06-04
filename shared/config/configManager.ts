import {Config} from "./types/config";
import * as fs from "fs";
import * as Path from "path";

const configNames: string[] = [
  "main.json"
];

const configs: Record<string, Config> = {};

(async () => {
  if(!fs.existsSync("./config")) fs.mkdirSync("./config");
  for (let configName of configNames) {
    const path = Path.join("./config", configName);

    if(!fs.existsSync(path)) {
      fs.copyFileSync(Path.join("./shared/config/configs", configName), path);
    }

    configs[Path.basename(configName, ".json")] = JSON.parse(fs.readFileSync(path, "utf-8"));
  }
})();

export function GetKey<T>(config: string, key: string) : T {
  return configs[config][key] as T;
}