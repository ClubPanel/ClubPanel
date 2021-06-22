import { Link } from "@chakra-ui/react";
import React from "react";
import MenuCategory from "./menuCategory";
import MenuItem from "./menuItem";

const MenuLink = ({ text, url, aria, category, ...rest }: Record<string, any> & { text: string, url: string, aria: string, category?: boolean, isExternal?: boolean }) : JSX.Element => {
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