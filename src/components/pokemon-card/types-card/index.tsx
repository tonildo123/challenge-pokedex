import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
type TypesCardProps = {
  types: { type: { name: string } }[];
  style?: StyleProp<ViewStyle>;
};

const TypesCard =  ({ types, style }: TypesCardProps) => (
  <View style={[{ flexDirection: 'row', marginRight: 12 }, style]}>
    {types.map(t => (
      <Text
        key={t.type.name}
        style={{
          marginRight: 6,
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
          textTransform: 'capitalize',
        }}
      >
        {t.type.name}
      </Text>
    ))}
  </View>
    
  );


export default TypesCard;