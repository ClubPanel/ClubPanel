import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React from "react";

import "../styles/index.scss";

import "../js/index";
import {theme} from "../lib/theme";

export const App = ({ Component, pageProps}: { Component: any, pageProps: any } ) : JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;