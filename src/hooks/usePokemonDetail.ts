import { useState, useEffect } from 'react';
import api from '../services/api';

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export const usePokemonDetail = (name: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(null);
    api
      .get(`/${name}`)
      .then(res => setPokemon(res.data))
      .catch(() => setError('No se pudo cargar el detalle'))
      .finally(() => setLoading(false));
  }, [name]);

  return { pokemon, loading, error };
};