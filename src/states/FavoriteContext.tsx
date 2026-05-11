import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PokemonListItem } from '../hooks/usePokemon';

interface FavoritesContextProps {
  favorites: PokemonListItem[];
  addFavorite: (pokemon: PokemonListItem) => void;
  removeFavorite: (pokemon: PokemonListItem) => void;
  isFavorite: (pokemon: PokemonListItem) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
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

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
}