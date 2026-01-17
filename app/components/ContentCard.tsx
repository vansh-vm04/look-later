import { View, Text, TouchableOpacity, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import React from "react";

export default function ContentCard({
  title,
  link,
  onDelete,
}: {
  title: string;
  link: string;
  onDelete: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#374151",
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
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
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f3f4f6" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#d1d5db" }}>{link}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
      <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
