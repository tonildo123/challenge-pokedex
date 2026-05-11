import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonListScreen from "../screens/pokemonListScreen";
import PokemonDetailScreen from "../screens/pokeomonDetailScreen";
import PokemonFavoriteScreen from "../screens/pokemonFavoriteScreen";
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalado
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="PokemonList">
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={({ navigation }) => ({
          title: "Listado de Pokemones",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('PokemonFavorite')}>
              <Ionicons name="heart" size={24} color="red" style={{ marginRight: 16 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={({ route }) => ({
          title: route.params?.name || "Detalle",
          headerBackTitle: "Volver",
        })}
      />
      <Stack.Screen
        name="PokemonFavorite"
        component={PokemonFavoriteScreen}
        options={{
          title: "Favoritos",
          headerBackTitle: "Volver",
        }}
      />
    </Stack.Navigator>
  );
}