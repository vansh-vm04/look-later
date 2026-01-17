import { useEffect, useRef, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  ToastAndroid,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderTitle } from "@react-navigation/elements";
import colors from "./styles/colors";
import { Stack } from "expo-router";
import AddContentButton from "./components/AddContentButton";
import { getContentItems, saveContentItem } from "./storage/contentStorage";
import { Content } from "./types/content";
import ContentCard from "./components/ContentCard";
import { textInputStyles } from "./styles/modal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface IndexProps {
  link?: string;
  title?: string;
  isShare?: boolean;
}

export default function Index(props: IndexProps) {
  const [title, setTitle] = useState(props.title || "");
  const [link, setLink] = useState(props.link || "");
  const [addContent, setAddContent] = useState(props.isShare || false);
  const [content, setContent] = useState<Content[]>([]);
  const titleRef = useRef<TextInput>(null);

  useEffect(() => {
    setContent(getContentItems());
  }, []);

  useEffect(() => {
    if (addContent) {
      setTimeout(() => {
        titleRef.current?.focus();
      }, 150);
    }
  }, [addContent]);

  const onCancel = () => {
    setAddContent(false);
    setTitle("");
    setLink("");
  };

  const onSave = (newTitle: string, newLink: string) => {
    if (!newTitle || !newLink) {
      ToastAndroid.show("Title and Link cannot be empty", ToastAndroid.SHORT);
      return;
    }
    const contentItem = {
      id: content.length.toString(),
      title: newTitle,
      link: newLink,
      createdAt: Date.now(),
    };
    saveContentItem(contentItem);
    const updatedContent = [...content, contentItem];
    setContent(updatedContent);
    ToastAndroid.show("Content saved successfully", ToastAndroid.TOP);
    setAddContent(false);
    setTitle("");
    setLink("");
  };

  const onDelete = (id: string) => {
    const updatedContent = content.filter((item) => item.id !== id);
    setContent(updatedContent);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerTitle: () => <HeaderTitle>LookLater</HeaderTitle>,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: {
              color: colors.text,
            },
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: colors.background,
            paddingBottom: 100,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
            Welcome!
          </Text>
          {content.length === 0 ? (
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                marginTop: 10,
              }}
            >
              No content saved yet. Click the + button to add.
            </Text>
          ) : (
            <View style={{ width: "90%", marginTop: 20 }}>
              {content.map((item) => (
                <ContentCard
                  key={item.id}
                  title={item.title}
                  link={item.link}
                />
              ))}
            </View>
          )}
          <Modal
            animationType="slide"
            visible={addContent}
            onRequestClose={onCancel}
            backdropColor={"rgba(0, 0, 0, 0.5)"}
          >
            <View style={styles.centeredView}>
              <KeyboardAvoidingView behavior="padding">
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
                <Text style={{ color: "white" }}>Title</Text>
                <TextInput
                  placeholder="Example: Elon's podcast"
                  placeholderTextColor={"gray"}
                  onChangeText={setTitle}
                  style={{ ...textInputStyles }}
                  value={title}
                  ref={titleRef}
                />
                <Text style={{ color: "white" }}>Link</Text>
                <TextInput
                  placeholder="https://example.com"
                  placeholderTextColor={"gray"}
                  onChangeText={setLink}
                  style={{ ...textInputStyles }}
                  value={link}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    gap: 20,
                  }}
                >
                  <Button
                    color={"rgb(245, 58, 58)"}
                    onPress={onCancel}
                    title="Cancel"
                  />
                  <Button
                    color={colors.primary}
                    onPress={() => onSave(title, link)}
                    title="Save"
                  />
                </View>
              </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
          <AddContentButton
            onPress={() => {
              setAddContent(true);
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
