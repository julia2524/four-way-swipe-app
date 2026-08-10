import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Home from "./src/screens/Home";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/styles/theme";

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Home />
    </ThemeProvider>
  );
}
