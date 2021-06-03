import React, { Component } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "./header";


const App = () : JSX.Element => {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "#222831"
        }
      }
    }
  });

  return (
    <ChakraProvider theme={theme}>
      <Header></Header>
    </ChakraProvider>
  );
};

export default App;