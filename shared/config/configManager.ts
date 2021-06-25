import {configs as configNames, RegisterConfig} from "./configFilesManager";
import * as fs from "fs";
import * as Path from "path";
import {configs} from "./configStore";
import {mainClient, mainServer} from "./configs/configs";

RegisterConfig({name: "server/main.json", default: mainServer});
RegisterConfig({name: "client/main.json", default: mainClient});

export const ReloadConfigs = () => {
  if(!fs.existsSync("./config")) fs.mkdirSync("./config");

  for (let configName of configNames) {
    const path = Path.join("./config", configName.name);
    const folderPath = Path.dirname(path);

    if(!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    if(typeof(configName.default) === "object") {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(configName.default, null, 4));
      }

      let parsed: object;
      try {
        parsed = JSON.parse(fs.readFileSync(path, "utf-8"));
      } catch (e) {
        throw new Error("Error loading " + configName.name + ": " + e.message);
      }

      const newConfig = Object.assign({}, configName.default);

      validateConfig(path, parsed, newConfig);

      configs[configName.name.replace(/^\.\//, "") /* ./abc -> abc */] = parsed;
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

      configs[configName.name.replace(/^\.\//, "") /* ./abc -> abc */] = value;
    }
  }
}

const validateConfig = (path: string, config: object, newConfig: object) => {
  for (const key of Object.keys(config)) {
    if(newConfig.hasOwnProperty(key)) {
      newConfig[key] = config[key];
    }
  }

  fs.writeFileSync(path, JSON.stringify(newConfig, null, 4));
}

ReloadConfigs();