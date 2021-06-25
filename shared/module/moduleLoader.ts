import * as fs from "fs";
import * as Path from "path";
import {ReloadConfigs} from "../config/configManager";
import {ConfigHandler, Module} from "./module";

declare const require;

let imports: Record<string, any> = null;

export const SharedData: Record<string, any> = {};

export async function LoadModules<T extends Module>(modulePath: string, useCjs?: boolean, loadModule = true) : Promise<T[]> {
  if(imports === null && !useCjs) importAll(require.context("../../modules", true, /^.+?\/(?:config|client).+?\.(tsx?|jsx?)$/));

  if(!fs.existsSync("./modules")) fs.mkdirSync("./modules");

  const output: T[] = [];

  for (const path of fs.readdirSync("./modules")) {
    try {
      (useCjs ? await import(Path.resolve(Path.join("./dist/modules", path, "config", "index.js"))) : imports[path + "/config/" + "index.ts"])?.default?.register();
    }
    catch(e) {
      if(!e?.message?.startsWith("Cannot find module")) throw e;
    }

    if(!loadModule) continue;

    let module: T = null;

    try {
      module = (useCjs ? await import(Path.resolve(Path.join("./dist/modules", path, modulePath, "index.js"))) : imports[path + "/" + modulePath + "/" + "index.ts"])?.default;
    } catch(e) {
      if(!e?.message?.startsWith("Cannot find module")) throw e;
    }

    if(!module) continue;

    if(isNaN(module.priority)) module.priority = 0;

    module["path"] = path;

    output.push(module);
  }

  ReloadConfigs();

  output.sort((a, b) => b.priority-a.priority);

  return output;
}

function importAll(r) {
  imports = {};
  r.keys().map(item => {
    const key = item.replace("./", "");

    imports[key] = r(item);
  });
}