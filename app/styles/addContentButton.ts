import { StyleSheet } from "react-native";
import colors from "./colors";

export const addContentButtonStyles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 76,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  text: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
