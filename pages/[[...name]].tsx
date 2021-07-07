import Header from "../components/header";
import React from "react";
import {GetConfig} from "../shared/config/configStore";
import {clientConfigs, propsMap, SetupModules} from "../lib/moduleHelpers";
import {MainConfigClient} from "../shared/config/types/mainConfig";
import * as Path from "path";
import {Config} from "../shared/config/types/config";
import {Box} from "@chakra-ui/layout";
import {UserInfo} from "../server/database/models/user";
import {ClientSide} from "../shared/module/moduleClient";
import {getCSRF} from "../server/util/csrf";

declare const require;

let imports: Record<string, any> = null;

function importAll(r) {
  imports = {};
  r.keys().map(item => {

    imports[item.replace("./", "")] = r(item);
  });
}

const loadModule = (module, component, config, userInfo, data, csrf) => {
  importAll(require.context("../modules", true, /^.+?\/(?:config|client).+?\.(tsx|jsx)$/));
  return component ? imports[Path.join(module, component).replace(/\\/g, "/")].default({config, userInfo, data, csrf}) : null;
};

export interface RenderProps {
  mainConfig: MainConfigClient;
  name: string;
  component: string;
  module: string;
  config: Record<string, Config>;
  userInfo: UserInfo;
  location: string;
  data: object;
  csrf: string;
}

const Page = (props: RenderProps) => {
  const { mainConfig, name, component, module, config, userInfo, data, csrf } = props;

  const comp = loadModule(module, component, config, userInfo, data, csrf);

  for (const module of modules) {
    module?.events?.render?.(props);
  }

  return (
    <>
      <Header name={mainConfig.name} sidebar={mainConfig.sidebar}/>
      <Box
        height="calc(100% - 72px)"
      >
        {comp}
      </Box>
    </>
  );
};

const mainConfig = GetConfig<MainConfigClient>("client/main.json");

const defaultProps = {
  mainConfig
};

let flag = false;
let modules: ClientSide[] = [];
const setup = SetupModules().then(mods => {
  flag = true;
  modules = mods || [];
});

export const getServerSideProps = async ({ params, req }) => {
  if(!flag && setup) await setup;

  const location = "/" + (params.name || []).join("/");

  const props = propsMap[location];
  if(!props) return {
    notFound: true
  };

  Object.assign(props, defaultProps);

  props["config"] = clientConfigs;
  props["location"] = location;
  props["userInfo"] = req.userInfo;
  props["data"] = req.moduleData;
  props["csrf"] = getCSRF(req.session);

  const output = {
    props: props as unknown as RenderProps
  };

  for (const module of modules) {
    module?.events?.preRender?.(output);
  }

  return output;
};

export default Page;