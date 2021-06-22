import Header from "../components/header";
import React from "react";
import {GetConfig} from "../shared/config/configStore";
import {propsMap, SetupModules} from "../lib/moduleHelpers";
import {MainConfigClient} from "../shared/config/types/mainConfig";
import * as Path from "path";
import {Config} from "../shared/config/types/config";
import {Box} from "@chakra-ui/layout";

declare const require;

let imports: Record<string, any> = null;

function importAll(r) {
  imports = {};
  r.keys().map(item => {

    imports[item.replace("./", "")] = r(item);
  });
}

const loadModule = (module, component, config) => {
  importAll(require.context("../modules", true, /^.+?\/(?:config|client).+?\.(tsx|jsx)$/));
  return component ? imports[Path.join(module, component).replace(/\\/g, "/")].default({config}) : null;
};

const Page = ({ mainConfig, name, component, module, config }: {mainConfig: MainConfigClient; name: string, component: string, module: string, config: Record<string, Config>}) => {
  const comp = loadModule(module, component, config);

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

export const getStaticProps = async ({params}) => {
  await SetupModules();

  const props = propsMap[(params.name || []).join("/")];
  const propsKeys = Object.keys(props);

  for (const key of Object.keys(defaultProps)) {
    if(propsKeys.includes(key)) continue;

    props[key] = defaultProps[key];
  }

  return {
    props
  };
};

export async function getStaticPaths() {
  await SetupModules();

  const output = {
    paths: [],
    fallback: false
  };

  for (const key of Object.keys(propsMap)) {
    output.paths.push({params: {name: key.split("/").filter(Boolean)}});
  }

  return output;
}

export default Page;