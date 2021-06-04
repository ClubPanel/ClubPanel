import Header from "../components/header";
import React from "react";
import {GetKey} from "../shared/config/configManager";
import {propsMap, SetupModules} from "../lib/moduleHelpers";

const Page = ({ name }: {name: string}) => {
  return (
    <Header name={name}/>
  );
};

const defaultProps = {
  name: GetKey("main", "name")
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