import { chakra } from "@chakra-ui/react";
import React from "react";

const Logo = ({ name }: { name: string }) => {
  return (
    <chakra.header fontFamily="alata" fontSize="20">
      {name}
    </chakra.header>
  );
};

export default Logo;