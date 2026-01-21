import { StyleSheet } from "react-native";

export const contentCardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 24,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    fontFamily: "Poppins_400Regular",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
    fontFamily: "Poppins_400Bold",
  },
  link: {
    fontSize: 14,
    color: "#a0a0a1",
    marginTop: 2,
    fontFamily: "Poppins_400Regular",
  },
  dateTime: {
    fontSize: 12,
    color: "#a0a0a1",
    marginTop: 12,
    fontFamily: "Poppins_400Regular",
  },
  contentContainer: {
    width: "90%",
  },
  deleteButton: {
    justifyContent: "center",
  },
});
