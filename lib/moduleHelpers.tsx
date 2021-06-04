import {Module} from "../shared/module/module";
import {LoadModules} from "../shared/module/moduleLoader";

export const propsMap: Record<string, object> = {};

export let modules: Module[] = null;

const addToMap = (path: string, props: object) => {
  propsMap[path.split("/").filter(Boolean).join("/")] = props;
};

export const SetupModules = async () => {
  if(modules) return;

  modules = await LoadModules();

  for (const module of modules) {
    if(!module.client) continue;

    module.client?.register(addToMap);
  }
};