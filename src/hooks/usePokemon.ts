import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const POKEMON_LIST_KEY = 'POKEDEX_POKEMON_LIST';

export interface PokemonListItem {
  name: string;
  url: string;
}

interface UsePokemonResult {
  pokemons: PokemonListItem[];
  fetchPokemons: () => void;
  loading: boolean;
  error: string | null;
}

export function usePokemon(): UsePokemonResult {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>('?limit=20');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Leer lista local al iniciar
  useEffect(() => {
    AsyncStorage.getItem(POKEMON_LIST_KEY).then(data => {
      if (data) setPokemons(JSON.parse(data));
    });
  }, []);

  // Guardar lista local cuando cambia
  useEffect(() => {
    if (pokemons.length > 0) {
      AsyncStorage.setItem(POKEMON_LIST_KEY, JSON.stringify(pokemons));
    }
  }, [pokemons]);

  const fetchPokemons = useCallback(async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(nextUrl);
      setPokemons(prev => [...prev, ...response.data.results]);
      setNextUrl(
        response.data.next
          ? response.data.next.replace(api.defaults.baseURL || '', '')
          : null
      );
    } catch (err) {
      setError('Error al cargar pokemones');
    } finally {
      setLoading(false);
    }
  }, [nextUrl, loading]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  return { pokemons, fetchPokemons, loading, error };
}