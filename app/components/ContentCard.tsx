import { View, Text, TouchableOpacity, Linking } from "react-native";

import React from "react";

export default function ContentCard({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (link.startsWith("http") === false) {
          link = "http://" + link;
        }
        // Open the link in a web browser
        Linking.openURL(link);
      }}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: "#374151",
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f3f4f6" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#d1d5db" }}>{link}</Text>
      </View>
    </TouchableOpacity>
  );
}
