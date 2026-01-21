import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import colors from "../styles/colors";
import { contentCardStyles } from "../styles/contentCard";

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
        ...contentCardStyles.card,
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
        style={contentCardStyles.contentContainer}
      >
        <Text style={contentCardStyles.title}>{title}</Text>
        <Text style={contentCardStyles.link}>{getDomainFromUrl(link)}</Text>
        <Text style={contentCardStyles.dateTime}>
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
