import { View, Text, Dimensions } from "react-native";
import React from "react";
import { theme } from "../theme";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",// Add background color if needed
    }}
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
}
