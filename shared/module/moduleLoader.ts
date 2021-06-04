import {Module} from "./module";
import * as fs from "fs";
import * as Path from "path";
import {ReloadConfigs} from "../config/configManager";

declare const require;

let imports: Record<string, any> = null;

export async function LoadModules(useCjs?: boolean) : Promise<Module[]> {
  if(imports === null && !useCjs) importAll(require.context("../../modules", true, /\.(tsx?|jsx?)$/));

  if(!fs.existsSync("./modules")) fs.mkdirSync("./modules");

  const output: Module[] = [];

  for (const path of fs.readdirSync("./modules")) {
    const module: Module = useCjs ? await import(Path.resolve(Path.join("./dist/modules", path, "index.js"))) : imports[path + "/" + "index.ts"];

    module.configs?.register();

    output.push(module);
  }

  ReloadConfigs();

  return output;
}

function importAll(r) {
  imports = {};
  r.keys().map(item => {
    imports[item.replace("./", "")] = r(item);
  });
}