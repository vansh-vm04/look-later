import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";
import { modalCard, textInputStyles } from "../styles/modal";

interface IAddContentModalProps {
  link: string;
  title: string;
  isOpen: boolean;
  onCancel?: () => void;
  onSave?: (title: string, link: string) => void;
}

export default function AddContentModal(props: IAddContentModalProps) {
  return (
    <Modal style={modalCard} animationIn={"slideInUp"} isVisible={props.isOpen}>
      <View
        style={{
          height: 300,
          justifyContent: "center",
          backgroundColor: "#1F2937",
          padding: 20,
          borderRadius: 10,
          gap: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontStyle: "bold" as any,
            fontSize: 18,
          }}
        >
          Content Details
        </Text>
        <TouchableOpacity style={{ flexDirection: "column", gap: 5 }}>
          <Text style={{ color: "white" }}>Title</Text>
          <TextInput style={{ ...textInputStyles }}>{props.title}</TextInput>
          <Text style={{ color: "white" }}>Link</Text>
          <TextInput style={{ ...textInputStyles }}>{props.link}</TextInput>
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", marginTop: 20, gap: 20 }}>
          <Button onPress={props.onCancel} title="Cancel" />
          <Button onPress={() => props.onSave && props.onSave(props.title, props.link)} title="Save" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
