import React from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { styles } from './styles';

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
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text style={styles.section}>Stats:</Text>
      {pokemon.stats.map(stat => (
        <Text key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</Text>
      ))}
      <Text style={styles.section}>Types:</Text>
      <FlatList
        data={pokemon.types}
        keyExtractor={item => item.type.name}
        renderItem={({ item }) => <Text>{item.type.name}</Text>}
        horizontal
      />
      <Text style={styles.section}>Abilities:</Text>
      <FlatList
        data={pokemon.abilities}
        keyExtractor={item => item.ability.name}
        renderItem={({ item }) => <Text>{item.ability.name}</Text>}
        horizontal
      />
    </View>
  );
}

export default PokemonDetailScreen;
