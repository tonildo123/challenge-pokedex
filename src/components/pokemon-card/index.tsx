import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PokemonListItem } from '../../hooks/usePokemon';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useFavorites } from '../../states/FavoriteContext';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(pokemon);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PokemonDetail', { name: pokemon.name })}
      style={styles.card}
      activeOpacity={0.8}
    >
      <View style={styles.favoriteIconContainer}>
        <TouchableOpacity
          onPress={e => {
            e.stopPropagation();
            favorite ? removeFavorite(pokemon) : addFavorite(pokemon);
          }}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={24}
            color={favorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg` }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{pokemon.name}</Text>
    </TouchableOpacity>
  );
}

export default PokemonCard;
