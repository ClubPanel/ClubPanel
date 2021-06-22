import { Link, MenuItem } from "@chakra-ui/react";
import React from "react";
import MenuCategory from "./menuCategory";

const MenuLink = (props: Record<string, any> & { text: string, url: string, aria: string, category?: boolean, isExternal?: boolean }) : JSX.Element => {
  props.category ||= false;
  props.isExternal ||= false;

  console.log("build 1");

  const { text, url, aria, category, ...rest } = props;

  console.log("build 2");

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
        <MenuCategory text={text} />
      ) : (
        <MenuItem text={text} />
      )}
    </Link>
  );
};

export default MenuLink;