import React from "react";
import MenuCategory from "./menuCategory";
import MenuLink from "./menuLink";

export interface IMenuLink {
  text: string;
  url: string;
  aria: string;
}

const MenuItems = ({ sidebar } : { sidebar: Record<string, IMenuLink[]> }) : JSX.Element => {
  const list: JSX.Element[] = [];

  console.log("creating navbar");

  console.log(sidebar, Object.keys(sidebar));

  for (const key of Object.keys(sidebar)) {
    console.log("key", key);

    list.push(<MenuCategory text={key} />);

    for(const link of sidebar[key]){
      console.log("link", link);
      list.push(<MenuLink text={link.text} url={link.url} aria={link.aria} />);
    }
  }

  console.log("done");

  return (
    <>
      {list}
    </>
  );
};

export default MenuItems;