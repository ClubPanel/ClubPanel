import Header from "../components/header";
import React from "react";
import {GetConfig} from "../shared/config/configStore";
import {propsMap, SetupModules} from "../lib/moduleHelpers";
import {MainConfigClient} from "../shared/config/types/mainConfig";
import * as Path from "path";
import {Config} from "../shared/config/types/config";
import {Box} from "@chakra-ui/layout";
import {UserInfo} from "../server/database/models/user";
import {ClientSide} from "../shared/module/moduleClient";

declare const require;

let imports: Record<string, any> = null;

function importAll(r) {
  imports = {};
  r.keys().map(item => {

    imports[item.replace("./", "")] = r(item);
  });
}

const loadModule = (module, component, config, userInfo) => {
  importAll(require.context("../modules", true, /^.+?\/(?:config|client).+?\.(tsx|jsx)$/));
  return component ? imports[Path.join(module, component).replace(/\\/g, "/")].default({config, userInfo}) : null;
};

export interface RenderProps {
  mainConfig: MainConfigClient;
  name: string;
  component: string;
  module: string;
  config: Record<string, Config>;
  userInfo: UserInfo;
  location: string;
}

const Page = (props: RenderProps) => {
  const { mainConfig, name, component, module, config, userInfo } = props;

  const comp = loadModule(module, component, config, userInfo);

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

  const location = (params.name || []).join("/");

  const props = propsMap[location];
  if(!props) return {
    notFound: true
  };

  const propsKeys = Object.keys(props);

  const newDefault: typeof defaultProps & { userInfo: UserInfo } = Object.assign({
    userInfo: req.userInfo
  }, defaultProps);

  for (const key of Object.keys(newDefault)) {
    if(propsKeys.includes(key)) continue;

    props[key] = newDefault[key];
  }

  props["location"] = location;

  const output = {
    props: props as unknown as RenderProps
  };

  for (const module of modules) {
    module?.events?.preRender?.(output);
  }

  return output;
};

export default Page;