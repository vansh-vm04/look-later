import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import colors from "../styles/colors";

export default function ContentCard({
  title,
  link,
  onDelete,
  savedAt,
  index,
}: {
  title: string;
  link: string;
  onDelete: () => void;
  savedAt: Date;
  index: number;
}) {
  const getDomainFromUrl = (url: string) => {
    try {
      const { hostname } = new URL(url);

      return hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const getCardColor = (index: number) => {
    return colors.CARD_COLORS[index % colors.CARD_COLORS.length];
  };
  const getCardBorderColor = (index: number) => {
    return colors.CARD_BORDER_COLORS[index % colors.CARD_BORDER_COLORS.length];
  };

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: getCardColor(index),
        borderColor: getCardBorderColor(index),
        borderWidth: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (link.startsWith("http") === false) {
            link = "http://" + link;
          }
          // Open the link in a web browser
          Linking.openURL(link);
        }}
        style={{ width: "90%" }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.link}>{getDomainFromUrl(link)}</Text>
        <Text style={styles.dateTime}>
          Saved on{" "}
          {savedAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" • "}
          {savedAt.toLocaleDateString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  card: {
    flexDirection: "row",
    borderRadius: 24,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    fontFamily: "Poppins_400Regular",
  },
});
