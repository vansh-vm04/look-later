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
  ScrollView,
} from "react-native";
import { HeaderTitle } from "@react-navigation/elements";
import colors from "./styles/colors";
import { Stack } from "expo-router";
import AddContentButton from "./components/AddContentButton";
import {
  getContentItems,
  saveContentItem,
  updateContentList,
} from "./storage/contentStorage";
import { Content } from "./types/content";
import ContentCard from "./components/ContentCard";
import { textInputStyles } from "./styles/modal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useShareIntent } from "expo-share-intent";
import { HEADER_LINES } from "./constants/headerLines";

export default function Index() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [addContent, setAddContent] = useState(false);
  const [content, setContent] = useState<Content[]>([]);
  const titleRef = useRef<TextInput>(null);
  const { hasShareIntent, shareIntent, resetShareIntent, error } =
    useShareIntent();
  const [headerLine, setHeaderLine] = useState("Hey👋, Welcome!");

  const getRandomHeaderLine = () => {
    return HEADER_LINES[Math.floor(Math.random() * HEADER_LINES.length)];
  };

  useEffect(() => {
    // Logic to handle received shared content goes here
    if (hasShareIntent && shareIntent) {
      const recievedUrl = shareIntent.webUrl || shareIntent.text || "";
      setAddContent(true);
      setLink(recievedUrl);
      resetShareIntent();
    }
    if (error) {
      console.log("Error receiving share intent: ", error);
    }
  }, [hasShareIntent, shareIntent, error]);

  useEffect(() => {
    setContent(getContentItems());
    setHeaderLine(getRandomHeaderLine());
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
    updateContentList(updatedContent);
    setContent(updatedContent);
    ToastAndroid.show("Content deleted", ToastAndroid.SHORT);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <HeaderTitle
                style={{
                  fontFamily: "Poppins_700Bold",
                  color: "#ffffff",
                  fontWeight: "bold" as any,
                  fontSize: 20,
                }}
              >
                LookLater
              </HeaderTitle>
            ),
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerShadowVisible: false,
          }}
        />
        <ScrollView
          style={{
            height: "100%",
            backgroundColor: colors.lightBg,
            borderRadius: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: colors.lightBg,
              paddingBottom: 100,
              height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins_700Bold",
                fontWeight: "semibold" as any,
                marginTop: 20,
                color: colors.primary,
                paddingHorizontal: 20,
              }}
            >
              {headerLine}
            </Text>
            {content.length === 0 ? (
              <Text
                style={{
                  fontSize: 18,
                  color: colors.textSecondary,
                  marginTop: 10,
                  textAlignVertical: "center",
                  textAlign: "center",
                  height: "100%" as any,
                  paddingHorizontal: 60,
                }}
              >
                No content saved yet. Click the + button to add.
              </Text>
            ) : (
              <View style={{ width: "90%", marginTop: 20 }}>
                {content.map((item, index) => (
                  <ContentCard
                    index={index}
                    savedAt={new Date(item.createdAt)}
                    onDelete={() => onDelete(item.id)}
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
          </View>
        </ScrollView>
        <AddContentButton
          onPress={() => {
            setAddContent(true);
          }}
        />
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
