import React from 'react';
import { View, Text, Image } from 'react-native';
import { TYPE_COLORS } from '../../constants';
import { styles } from './styles';

const PokemonDetailCard = ({ pokemon }: { pokemon: any }) => {
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const typeColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal;

  return (
    <View style={[styles.card, { backgroundColor: typeColor }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>{pokemon.name}</Text>
      </View>
      <View style={[styles.dataSection, { backgroundColor: typeColor }]}>
       
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Tipo:</Text>
          <Text style={styles.dataValue}>
            {pokemon.types.map((t: { type: { name: string } }) => t.type.name).join(', ')}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>HP:</Text>
          <Text style={styles.dataValue}>
            {pokemon.stats.find((s: { stat: { name: string }; base_stat: number }) => s.stat.name === 'hp')?.base_stat}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Ataque:</Text>
          <Text style={styles.dataValue}>
            {pokemon.stats.find((s: { stat: { name: string }; base_stat: number }) => s.stat.name === 'attack')?.base_stat}
          </Text>
        </View>
         <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Habilidades:</Text>
          <Text style={styles.dataValue}>
            {pokemon.abilities.map((a: { ability: { name: string } }) => a.ability.name).join(', ')}
          </Text>
        </View>
        
      </View>
    </View>
  );
};



export default PokemonDetailCard;