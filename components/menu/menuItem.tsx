import {chakra, useColorModeValue} from "@chakra-ui/react";
import React from "react";

const MenuItem = (props: { text : string }) => (
  <chakra.h3
    fontSize="1rem"
    my="3%"
    color={useColorModeValue("gray.700", "inherit")}
  >
    {props.text}
  </chakra.h3>
);

export default MenuItem;