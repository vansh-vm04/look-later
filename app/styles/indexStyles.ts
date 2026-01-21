import { StyleSheet } from "react-native";
import colors from "./colors";

export const indexStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollView: {
    height: "100%",
    backgroundColor: colors.lightBg,
    borderRadius: 24,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.lightBg,
    paddingBottom: 100,
    height: "100%",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    fontWeight: "semibold" as any,
    marginTop: 20,
    color: colors.primary,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 10,
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%" as any,
    paddingHorizontal: 60,
  },
  contentList: {
    width: "90%",
    marginTop: 20,
  },
  headerTitle: {
    fontFamily: "Poppins_500Medium",
    color: "#ffffff",
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    height: 300,
    justifyContent: "center",
    backgroundColor: "#1F2937",
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  modalTitle: {
    color: "white",
    textAlign: "center",
    fontStyle: "bold" as any,
    fontSize: 18,
  },
  modalLabel: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },
});
