import { useState } from "react";
import { Text, View } from "react-native";
import AddContentModal from "./components/AddContentModal";
import { HeaderTitle } from "@react-navigation/elements";
import colors from "./styles/colors";
import { Stack } from "expo-router";
import AddContentButton from "./components/AddContentButton";

interface IndexProps {
  link?: string;
  title?: string;
  isShare?: boolean;
}

export default function Index(props: IndexProps) {
  const [title, setTitle] = useState(props.title || "")
  const [link, setLink] = useState(props.link || "")
  const [addContent, setAddContent] = useState(props.isShare || false)

  const onCancel = () => {
    setAddContent(false);
    setTitle("");
    setLink("");
  }

  const onSave = (newTitle: string, newLink: string) => {
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
      <AddContentModal onCancel={onCancel} onSave={onSave} link={link} title={title} isOpen={addContent} />
      <AddContentButton onPress={() => setAddContent(true)}></AddContentButton>
    </View>
    </>
  );
}
