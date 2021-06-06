import React, { Component } from "react";
import MenuCategory from "./menuCategory";
import MenuLink from "./menuLink";

export interface IMenuLink {
  text: string;
  url: string;
  aria: string;
}

const links: Record<string, IMenuLink[]> = {};

export const RegisterMenuLink = (category: string, link?: IMenuLink) => {
  if(!link && !links.hasOwnProperty(category)) {
    links[category] = [];
  }

  if(link) links[category].push(link);
};

const MenuItems = () : JSX.Element => {
  const list: JSX.Element[] = [];

  for (const key of Object.keys(links)) {
    list.push(<MenuCategory text={key} />);

    for(const link of links[key]){
      list.push(<MenuLink text={link.text} url={link.url}  aria={link.aria}/>);
    }
  }

  return (
    <>
      {list}
    </>
  );
};

export default MenuItems;