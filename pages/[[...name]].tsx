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
import {MatchURLPattern} from "../shared/util/url";

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

/**
 * The props sent to the render function.
 */
export interface RenderProps {
  /**
   * The main client config.
   */
  mainConfig: MainConfigClient;
  /**
   * The name of the ClubPanel, which will appear on the sidebar.
   */
  name: string;
  /**
   * The path to the component, relative to the root of its module's directory.
   */
  component: string;
  /**
   * The path of the module.
   */
  module: string;
  /**
   * An object containing every client config.
   */
  config: Record<string, Config>;
  /**
   * The user info of the user making the request.
   */
  userInfo: UserInfo;
  /**
   * The path of the request in the browser.
   */
  location: string;
  /**
   * The custom data from `getData`.
   */
  data: object;
  /**
   * The CSRF token.
   */
  csrf: string;
  /**
   * An object containing the parsed params of the request URL.
   */
  params: object;
}

const Page = (props: RenderProps) => {
  for (const module of modules) {
    module?.events?.render?.(props);
  }

  const { mainConfig, name, component, module, config, userInfo, data, csrf } = props;

  const comp = loadModule(module, component, config, userInfo, data, csrf);

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

  let props = null;

  for (const key of Object.keys(propsMap)) {
    const match = MatchURLPattern(location, key);

    if(match) {
      props = propsMap[key];
      props["params"] = match;
    }
  }

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