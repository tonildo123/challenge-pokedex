import { StyleProp, Text, TextStyle, View } from "react-native";

const NameCard = ({ name, style }: { name: string, style?: StyleProp<TextStyle> }) => {
  return (
    
      <Text style={style}>{name}</Text>
    
  );
}

export default NameCard;