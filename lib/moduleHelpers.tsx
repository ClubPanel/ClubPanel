import {Module} from "../shared/module/module";
import {LoadModules} from "../shared/module/moduleLoader";
import {configs} from "../shared/config/configStore";
import {Config} from "../shared/config/types/config";

export const propsMap: Record<string, ClientProps & {module: string; component: string}> = {};

export let modules: Module[] = null;

export interface ClientProps {
  name: string;
}

export const SetupModules = async () => {
  if(modules) return;

  modules = await LoadModules();

  for (const module of modules) {
    if(!module.client) continue;

    module.client?.register((path: string, props: ClientProps, component?: string) => {
      const newProps = props as ClientProps & {module: string; component: string, config: Record<string, Config>};
      newProps.component = component || null;
      newProps.module = module["path"];
      newProps.config = configs;

      propsMap[path.split("/").filter(Boolean).join("/")] = newProps;
    });
  }
};