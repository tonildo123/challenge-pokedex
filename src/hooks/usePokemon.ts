import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const POKEMON_LIST_KEY = 'POKEDEX_POKEMON_LIST';

export interface PokemonListItem {
  name: string;
  url: string;
  types?: { type: { name: string } }[];
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
    console.log('Primer pokemon:', pokemons[0]);
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
    const basicList = response.data.results;

    // Obtener detalles de cada pokémon (incluyendo types)
    const detailedList = await Promise.all(
      basicList.map(async (p: PokemonListItem) => {
        try {
          const res = await fetch(p.url);
          const data = await res.json();
          return { ...p, types: data.types };
        } catch {
          return { ...p, types: [] };
        }
      })
    );

    setPokemons(prev => [...prev, ...detailedList]);
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