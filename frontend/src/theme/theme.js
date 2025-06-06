import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  fonts: {
    body: `"Inter", sans-serif`,
  },
  colors: {
    // default dark color of chakra component
    // gray: {
    //   700: "#f00",
    // },
    dark: {
      50: "#f4f6f8",
      100: "#e9ecef",
      200: "#cfd4da",
      300: "#b5bbc5",
      400: "#7e8796",
      500: "#49505a",
      600: "#343942",
      700: "#222831", // base color
      800: "#181d22",
      900: "#0f1114",
    },
    teal: {
      50: "#e6f9f0",
      100: "#c1f2d8",
      200: "#92e6b7",
      300: "#5fd98f",
      400: "#38cc6c",
      500: "#22b559", // base color (green)
      600: "#19994a",
      700: "#157f3e",
      800: "#116634",
      900: "#0a3d1e",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
      },
    }),
  },
});
