import {extendTheme, withDefaultColorScheme, withDefaultProps} from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    dark: {
      100: "#373d4e",
      200: "#353e4c",
      300: "#303944",
      400: "#29303b",
      500: "#222831",
      600: "#1d232a",
      700: "#1a1f26",
      800: "#111318",
      900: "#12151a",
    }
  },
  styles: {
    global: {
      body: {
        bg: "dark.500",
        color: "white"
      }
    }
  },
  components: {
    Drawer: {
      baseStyle: {
        dialog: {
          bg: "dark.700"
        }
      }
    }
  },
  initialColorMode: "dark",
  useSystemColorMode: false
}, withDefaultColorScheme({colorScheme: "dark"}));