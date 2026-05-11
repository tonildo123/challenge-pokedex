import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PokemonListItem } from '../hooks/usePokemon';

const FAVORITES_KEY = 'POKEDEX_FAVORITES';

interface FavoritesContextProps {
  favorites: PokemonListItem[];
  addFavorite: (pokemon: PokemonListItem) => void;
  removeFavorite: (pokemon: PokemonListItem) => void;
  isFavorite: (pokemon: PokemonListItem) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<PokemonListItem[]>([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY).then(data => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  // Guardar favoritos cuando cambian
  useEffect(() => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

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