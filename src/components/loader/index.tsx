import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Loader = () => (
  <SkeletonPlaceholder>
    {[...Array(4)].map((_, i) => (
      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ width: 100, height: 100, borderRadius: 12 }} />
        <View style={{ marginLeft: 12 }}>
          <View style={{ width: 120, height: 20, borderRadius: 4, marginBottom: 6 }} />
          <View style={{ width: 80, height: 20, borderRadius: 4 }} />
        </View>
      </View>
    ))}
  </SkeletonPlaceholder>
);

export default Loader;