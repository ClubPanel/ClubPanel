import {ClientSide} from "../shared/module/module";
import {LoadModules} from "../shared/module/moduleLoader";
import {configs} from "../shared/config/configStore";
import {Config} from "../shared/config/types/config";

export const propsMap: Record<string, ClientProps & {module: string; component: string}> = {};

export let modules: ClientSide[] = null;

export interface ClientProps {
  siteName: string;
  name: string;
}

export const SetupModules = async () => {
  if(modules) return;

  modules = await LoadModules<ClientSide>("client", false);

  for (const module of modules) {
    if(!module?.register) continue;

    module.register((path: string, props: ClientProps, component?: string) => {
      const newProps = props as ClientProps & {module: string; component: string, config: Record<string, Config>};
      newProps.component = component || null;
      newProps.module = module["path"];

      const clientConfigs = module.configs ? Object.fromEntries(Object.entries(configs).filter(entry => module.configs.includes(entry[0]))) : {};
      const serverConfigsInClientConfigs = Object.keys(clientConfigs).filter(key => key.replace(/^\.\// /* ./abc -> abc */, "").startsWith("server/"));

      if(serverConfigsInClientConfigs.length > 0) {
        throw new Error("A module is attempting to access server configs on the client. Module: \"" + newProps.module + "\", configs: \"" + serverConfigsInClientConfigs.join(", ") + "\".");
      }

      newProps.config = clientConfigs;

      propsMap[path.split("/").filter(Boolean).join("/")] = newProps;
    });
  }
};