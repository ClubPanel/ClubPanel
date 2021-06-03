import { chakra } from "@chakra-ui/react";
import React, { Component } from "react";
import { GetKeyMain } from "../config/configManager";

class Logo extends Component {
  render() : JSX.Element {
    return (
      <chakra.header fontFamily="alata" fontSize="20">
        {GetKeyMain("name")}
      </chakra.header>
    );
  }
}

export default Logo;