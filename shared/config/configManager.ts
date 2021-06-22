import {configs as configNames, RegisterConfig} from "./configFilesManager";
import * as fs from "fs";
import * as Path from "path";
import {configs} from "./configStore";
import {mainClient, mainServer} from "./configs/configs";

RegisterConfig({name: "server/main.json", default: JSON.stringify(mainServer, null, 4)});
RegisterConfig({name: "client/main.json", default: JSON.stringify(mainClient, null, 4)});

export const ReloadConfigs = () => {
  if(!fs.existsSync("./config")) fs.mkdirSync("./config");

  for (let configName of configNames) {
    const path = Path.join("./config", configName.name);
    const folderPath = Path.dirname(path);

    if(!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

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

ReloadConfigs();