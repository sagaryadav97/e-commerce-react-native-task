import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/images';
import {COLORS} from '../../utils/colors';

export default function Cart() {
  return (
    <View>
      <View style={styles.badge}>
        <Text style={styles.badgeCount}>3</Text>
      </View>
      <Image style={styles.imageIcon} source={IMAGES.CartIcon} />
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
