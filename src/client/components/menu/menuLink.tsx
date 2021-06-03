import { Link, MenuItem } from "@chakra-ui/react";
import React, { Component } from "react";
import MenuCategory from "./menuCategory";

const MenuLink = (props: Record<string, any> & { text: string, url: string, aria: string, category?: boolean, isExternal?: boolean }) : JSX.Element => {
  const { text, url, aria, category, ...rest } = props;

  return (
    <Link
      href={url}
      mr="3"
      aria-label={aria}
      max-width="80%"
      display="block"
      {...rest}
    >
      {category ? (
        <MenuCategory text={text}/>
      ) : (
        <MenuItem text={text}/>
      )}
    </Link>
  );
};

export default MenuLink;