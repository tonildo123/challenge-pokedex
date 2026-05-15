import { Image, ImageStyle, StyleProp, Text, TextStyle, View } from "react-native";

const ImageCard = ({ uri, style, resizeMode }: { uri: string, style?: StyleProp<ImageStyle>, resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center" }) => {
  return (
    <Image 
        style={style} 
        source={{ uri: `https://img.pokemondb.net/artwork/large/${uri}.jpg` }} 
        resizeMode={resizeMode} 
    />
    
  );
}

export default ImageCard;