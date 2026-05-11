import { useState } from 'react';
import type { PokemonListItem } from './usePokemon';

export function useFavorites() {
  const [favorites, setFavorites] = useState<PokemonListItem[]>([]);

  const addFavorite = (pokemon: PokemonListItem) => {
    setFavorites(prev =>
      prev.find(p => p.name === pokemon.name) ? prev : [...prev, pokemon]
    );
  };

  const removeFavorite = (pokemon: PokemonListItem) => {
    setFavorites(prev => prev.filter(p => p.name !== pokemon.name));
  };

  const isFavorite = (pokemon: PokemonListItem) =>
    favorites.some(p => p.name === pokemon.name);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}