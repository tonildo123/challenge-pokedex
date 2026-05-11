import React from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { styles } from './styles';
import PokemonDetailCard from '../../components/pokemon-detail-card';

type DetailRoute = RouteProp<{ params: { name: string } }, 'params'>;

const PokemonDetailScreen = () => {
  const route = useRoute<DetailRoute>();
  const { name } = route.params;
  const { pokemon, loading, error } = usePokemonDetail(name);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
if (error) return <Text>{error}</Text>;
if (!pokemon) return null;

return (
  <View style={styles.container}>
    <PokemonDetailCard pokemon={pokemon} />
  </View>
);
}

export default PokemonDetailScreen;
