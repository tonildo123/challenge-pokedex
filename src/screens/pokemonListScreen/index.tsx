import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, TextInput } from 'react-native';
import PokemonCard from '../../components/pokemon-card';
import ErrorMessage from '../../components/error-messages';
import Loader from '../../components/loader';
import { usePokemon } from '../../hooks/usePokemon';

const PokemonListScreen = () => {
  const { pokemons, fetchPokemons, loading, error } = usePokemon();
  const [search, setSearch] = useState('');
  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Buscar Pokémon"
        value={search}
        onChangeText={setSearch}
        style={{
          margin: 12,
          padding: 8,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#ccc',
        }}
      />
      {error && <ErrorMessage message={error} />}
      {loading && pokemons.length === 0 ? (
        <Loader />
      ) : (
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item, index) => item.name + '-' + index}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReached={fetchPokemons}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !loading ? (
            <ErrorMessage
              message={
                search
                  ? 'Sin resultados de búsqueda'
                  : 'No hay pokemones para mostrar'
              }
            />
          ) : null
        }
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
      )}
    </View>
  );
}

export default PokemonListScreen;