import React from 'react';
import {  TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PokemonListItem } from '../../hooks/usePokemon';
import { styles } from './styles';
import { useFavorites } from '../../states/FavoriteContext';
import { TYPE_COLORS } from '../../constants';
import NameCard from './name-card';
import ImageCard from './image-card';
import FavoriteButton from './favorite-button';
import TypesCard from './types-card';

interface PokemonCardProps {
  pokemon: PokemonListItem & { types?: { type: { name: string } }[] };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(pokemon);
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const backgroundColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal;

  const handlePressCard = () => {
    navigation.navigate('PokemonDetail', { name: pokemon.name });
  }

  const handlePressFavorite = (e: any) => {
    e.stopPropagation();
    favorite ? removeFavorite(pokemon) : addFavorite(pokemon);
  }

  return (
    <TouchableOpacity
      onPress={handlePressCard}
      style={[styles.card, { backgroundColor }]}
      activeOpacity={0.8}
    >
      <View style={styles.descriptionCard}>        
         <NameCard name={pokemon.name} style={styles.name} />
        
        <View style={styles.typesAndFavoriteContainer}>
          {pokemon.types && <TypesCard types={pokemon.types} />}
        <FavoriteButton
          isFavorite={favorite}
          onPress={handlePressFavorite}
        />
        </View>
      </View>
      <ImageCard
        uri={pokemon.name}
        style={[styles.image, {   backgroundColor: 'transparent',marginLeft: 8 }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PokemonCard;