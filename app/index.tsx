import { HeaderTitle } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useShareIntent } from "expo-share-intent";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AddContentButton from "./components/AddContentButton";
import ContentCard from "./components/ContentCard";
import { HEADER_LINES } from "./constants/headerLines";
import {
  getContentItems,
  saveContentItem,
  updateContentList,
} from "./storage/contentStorage";
import colors from "./styles/colors";
import { indexStyles } from "./styles/indexStyles";
import { textInputStylesCompat } from "./styles/modal";
import { Content } from "./types/content";

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
      }, 300);
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
      <SafeAreaView style={indexStyles.safeAreaView}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <HeaderTitle style={indexStyles.headerTitle}>
                LookLater
              </HeaderTitle>
            ),
            headerStyle: indexStyles.headerStyle,
            headerShadowVisible: false,
          }}
        />
        <ScrollView style={indexStyles.scrollView}>
          <View style={indexStyles.mainContainer}>
            <Text style={indexStyles.headerText}>{headerLine}</Text>
            {content.length === 0 ? (
              <Text style={indexStyles.emptyText}>
                No content saved yet. Click the + button to add.
              </Text>
            ) : (
              <View style={indexStyles.contentList}>
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
              <View style={indexStyles.centeredView}>
                <KeyboardAvoidingView behavior="padding">
                  <View style={indexStyles.modalContent}>
                    <Text style={indexStyles.modalTitle}>Content Details</Text>
                    <Text style={indexStyles.modalLabel}>Title</Text>
                    <TextInput
                      placeholder="Example: Elon's podcast"
                      placeholderTextColor={"gray"}
                      onChangeText={setTitle}
                      style={textInputStylesCompat}
                      value={title}
                      ref={titleRef}
                    />
                    <Text style={indexStyles.modalLabel}>Link</Text>
                    <TextInput
                      placeholder="https://example.com"
                      placeholderTextColor={"gray"}
                      onChangeText={setLink}
                      style={textInputStylesCompat}
                      value={link}
                    />
                    <View style={indexStyles.buttonContainer}>
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
