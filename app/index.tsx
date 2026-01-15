import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AddContentModal from "./components/AddContentModal";
import { HeaderTitle } from "@react-navigation/elements";
import colors from "./styles/colors";
import { Stack } from "expo-router";
import AddContentButton from "./components/AddContentButton";
import { ToastAndroid } from "react-native";
import { getContentItems, saveContentItem } from "./storage/contentStorage";
import { Content } from "./types/content";
import ContentCard from "./components/ContentCard";

interface IndexProps {
  link?: string;
  title?: string;
  isShare?: boolean;
}

export default function Index(props: IndexProps) {
  const [title, setTitle] = useState(props.title || "")
  const [link, setLink] = useState(props.link || "")
  const [addContent, setAddContent] = useState(props.isShare || false)
  const [content, setContent] = useState<Content[]>([]);

  useEffect(() => {
    setContent(getContentItems())
  }, [])
  
  const onCancel = () => {
    setAddContent(false);
    setTitle("");
    setLink("");
  }

  const onSave = (newTitle: string, newLink: string) => {
    if(!newTitle || !newLink){
      ToastAndroid.show("Title and Link cannot be empty", ToastAndroid.TOP);
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
  }

  return (
    <>
    <Stack.Screen options={{
      headerTitle: () => <HeaderTitle>LookLater</HeaderTitle>,
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTitleStyle: {
        color: colors.text,
      },
    }} />
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.background,
        paddingBottom: 100,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>Welcome!</Text>
      {content.length === 0 ? (
        <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 10 }}>No content saved yet. Click the + button to add.</Text>
      ) : (
        <View style={{ width: "90%", marginTop: 20 }}>
          {content.map((item) => (
            <ContentCard key={item.id} title={item.title} link={item.link} />
          ))}
        </View>
      )}
      <AddContentModal onCancel={onCancel} onSave={onSave} link={link} title={title} isOpen={addContent} />
      <AddContentButton onPress={() => setAddContent(true)}></AddContentButton>
    </View>
    </>
  );
}
