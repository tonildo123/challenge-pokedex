import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onPress: (e: any) => void;
};

const FavoriteButton = ({ isFavorite, onPress }: FavoriteButtonProps) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 4 }}>
    <Ionicons
      name={isFavorite ? "heart" : "heart-outline"}
      size={24}
      color={isFavorite ? "red" : "gray"}
    />
  </TouchableOpacity>
);

export default FavoriteButton;