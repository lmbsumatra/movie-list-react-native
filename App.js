import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
export default function App() {
  return <AppNavigation />;
}

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});
