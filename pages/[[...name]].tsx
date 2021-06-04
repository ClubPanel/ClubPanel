import Header from "../components/header";
import React from "react";
import {GetKey} from "../shared/config/configManager";
import {InferGetStaticPropsType} from "next";
import {LoadModules} from "../shared/module/moduleLoader";

const Page = ({ name }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Header name={name}/>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      name: GetKey("main", "name")
    }
  };
};

export async function getStaticPaths() {
  await LoadModules();

  return {
    paths: [
      { params: { name: [] } }
    ],
    fallback: false
  };
}

export default Page;