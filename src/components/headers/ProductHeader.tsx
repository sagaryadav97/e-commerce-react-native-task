import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/images';
import {COLORS} from '../../utils/colors';
import Cart from '../Cart/Cart';
import CartBlack from '../Cart/CartBlack';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const ProductHeader = () => {
  const navigation = useNavigation<any>();

  const Icon = () => (
    <OcticonsIcons
      //   style={styles.icon}
      size={18}
      name="chevron-left"
      color={COLORS.black}
    />
  )

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circle}>
          <Icon />
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <CartBlack />
      </View>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 110,
    paddingHorizontal: 20,
  },
  leftName: {
    color: COLORS.nameColor,
    fontSize: 20,
    fontWeight: '600',
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.addressText,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // rightBadge: {},
});
