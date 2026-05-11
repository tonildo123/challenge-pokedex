import React, { useEffect } from 'react';
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

  // Obtiene el tipo principal, si existe
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const backgroundColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal;


  useEffect(() => {
    console.log(`Cargando información de `, JSON.stringify(pokemon, null, 2));
    // Aquí podrías cargar información adicional del Pokémon si es necesario
  }, [pokemon]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PokemonDetail', { name: pokemon.name })}
      style={[styles.card, { backgroundColor }]}
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
      {/* Mostrar tipos si existen */}
      {pokemon.types && (
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          {pokemon.types.map(t => (
            <Text
              key={t.type.name}
              style={{ marginRight: 6, color: '#fff', fontWeight: 'bold', fontSize: 12 }}
            >
              {t.type.name}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PokemonCard;