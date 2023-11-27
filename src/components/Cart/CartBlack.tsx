import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/images';
import {COLORS} from '../../utils/colors';
import {useProducts} from '../../contexts/Product.Context';
import {useNavigation} from '@react-navigation/native';

export default function CartBlack() {
  const {state} = useProducts();
  const navigation = useNavigation<any>();

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('Cart')}
        style={styles.badge}>
        <Text style={styles.badgeCount}>{state.cart.length}</Text>
      </TouchableOpacity>
      <Image style={styles.imageIcon} source={IMAGES.bagBlack} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageIcon: {
    height: 30,
    width: 30,
  },
  badge: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.badgeBg,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 1,
  },
  badgeCount: {
    color: COLORS.whiteColor,
  },
  // rightBadge: {},
});
