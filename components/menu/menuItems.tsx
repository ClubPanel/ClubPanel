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

  for (const key of Object.keys(sidebar)) {

    list.push(<MenuCategory key={key} text={key} />);

    for (let i = 0; i < sidebar[key].length; i++){
      const link = sidebar[key][i];

      list.push(<MenuLink key={key + "-" + i} text={link.text} url={link.url} aria={link.aria} />);
    }
  }

  return (
    <>
      {list}
    </>
  );
};

export default MenuItems;