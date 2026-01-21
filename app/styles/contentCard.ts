import { StyleSheet } from "react-native";

export const contentCardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 14,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    fontFamily: "Poppins_400Regular",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "Poppins_400Bold",
    marginBottom: 4,
  },
  link: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 6,
    fontFamily: "Poppins_400Regular",
  },
  dateTime: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
  contentContainer: {
    width: "90%",
  },
  deleteButton: {
    justifyContent: "center",
    padding: 8,
  },
});
