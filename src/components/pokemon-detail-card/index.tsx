import React from 'react';
import { View, Text, Image } from 'react-native';
import { TYPE_COLORS } from '../../constants';
import { styles } from './styles';
import ImageCard from '../pokemon-card/image-card';
import NameCard from '../pokemon-card/name-card';
import DataRow from './data-row';

const PokemonDetailCard = ({ pokemon }: { pokemon: any }) => {
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const typeColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal;

  return (
    <View style={[styles.card, { backgroundColor: typeColor }]}>
      <View style={styles.header}>
        <ImageCard
          uri={pokemon.name}
          style={styles.image}
          resizeMode="contain"
        />        
         <NameCard name={pokemon.name} style={styles.name} />
      </View>
      <View style={[styles.dataSection, { backgroundColor: typeColor }]}>
       
        <DataRow
          label="Tipo:"
          value={pokemon.types.map((t: { type: { name: string } }) => t.type.name).join(', ')}
        />
        <DataRow
          label="HP:"
          value={pokemon.stats.find((s: { stat: { name: string }; base_stat: number }) => s.stat.name === 'hp')?.base_stat}
        />
        <DataRow
          label="Ataque:"
          value={pokemon.stats.find((s: { stat: { name: string }; base_stat: number }) => s.stat.name === 'attack')?.base_stat}
        />
         <DataRow
            label="Habilidades:"
            value={pokemon.abilities.map((a: { ability: { name: string } }) => a.ability.name).join(', ')}
          />
        
      </View>
    </View>
  );
};



export default PokemonDetailCard;