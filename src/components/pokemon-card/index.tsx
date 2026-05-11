import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PokemonListItem } from '../../hooks/usePokemon';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useFavorites } from '../../states/FavoriteContext';
import { TYPE_COLORS } from '../../constants';

interface PokemonCardProps {
  pokemon: PokemonListItem & { types?: { type: { name: string } }[] };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(pokemon);
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const backgroundColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PokemonDetail', { name: pokemon.name })}
      style={[styles.card, { backgroundColor, flexDirection: 'row', alignItems: 'center' }]}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        
        <Text style={styles.name}>{pokemon.name}</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          {pokemon.types && (
            <View style={{ flexDirection: 'row', marginRight: 12 }}>
              {pokemon.types.map(t => (
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
          )}
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              favorite ? removeFavorite(pokemon) : addFavorite(pokemon);
            }}
            style={{ padding: 4 }}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={24}
              color={favorite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={{ uri: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg` }}
        style={[styles.image, {   backgroundColor: 'transparent',marginLeft: 8 }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PokemonCard;