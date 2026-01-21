import { Text, TouchableOpacity } from "react-native";
import { addContentButtonStyles } from "../styles/addContentButton";

export default function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={addContentButtonStyles.button} onPress={onPress}>
      <Text style={addContentButtonStyles.text}>+</Text>
    </TouchableOpacity>
  );
}
