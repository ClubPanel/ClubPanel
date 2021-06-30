import {extendTheme} from "@chakra-ui/react";

export const theme = extendTheme({
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