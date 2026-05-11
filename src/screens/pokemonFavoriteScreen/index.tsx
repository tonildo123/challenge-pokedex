import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PokemonCard from '../../components/pokemon-card';
import { useFavorites } from '../../states/FavoriteContext';

const PokemonFavoriteScreen = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tienes pokemones favoritos.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.name}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
    />
  );
}

export default PokemonFavoriteScreen;