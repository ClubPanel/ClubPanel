import {ClientSide} from "../shared/module/moduleClient";
import {LoadModules} from "../shared/module/moduleLoader";
import {configs} from "../shared/config/configStore";
import {Config} from "../shared/config/types/config";

export const propsMap: Record<string, ClientProps & {module: string; component: string}> = {};

export let modules: ClientSide[] = null;

export interface ClientProps {
  siteName: string;
  name: string;
}

export let clientConfigs: Record<string, Config> = null;

export const SetupModules = async () => {
  if(modules) return modules;

  modules = await LoadModules<ClientSide>("client", false);

  for (const module of modules) {
    module?.register?.((path: string, props: ClientProps, component?: string) => {
      const newProps = props as ClientProps & {module: string; component: string};
      newProps.component = component || null;
      newProps.module = module["path"];

      propsMap[path.split("/").filter(Boolean).join("/")] = newProps;
    });
  }

  //Get all configs that start with "client/" and are not main
  clientConfigs = Object.fromEntries(Object.keys(configs).filter(key => key !== "client/main.json" && key.replace(/^\.\// /* ./abc -> abc */, "").startsWith("client/")).map(key => [key, configs[key]]));

  return modules;
};