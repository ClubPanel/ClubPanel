import { chakra } from "@chakra-ui/react";
import React from "react";

const MenuCategory = (props: { text: string }) : JSX.Element => {
  return (
    <chakra.h4
      fontSize="sm"
      fontWeight="bold"
      my="6%"
      textTransform="uppercase"
      letterSpacing="wider"
      color="white"
    >
      {props.text}
    </chakra.h4>
  );
};

export default MenuCategory;