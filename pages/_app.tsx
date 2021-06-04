import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import React from "react";

import "../styles/index.scss";

import "../js/index";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#222831",
        color: "white"
      }
    }
  },
  initialColorMode: "dark",
  useSystemColorMode: false
});

export const App = ({ Component, pageProps}: { Component: any, pageProps: any } ) : JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;