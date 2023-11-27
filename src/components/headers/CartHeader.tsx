import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/images';
import {COLORS} from '../../utils/colors';
import Cart from '../Cart/Cart';
import CartBlack from '../Cart/CartBlack';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import { useProducts } from '../../contexts/Product.Context';

const CartHeader = () => {
  const navigation = useNavigation<any>();
  const {state} = useProducts();

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
        <Text style={styles.leftName}>Shopping Cart ({state.cart.length})</Text>
      </View>
     
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 110,
    paddingHorizontal: 20,
  },
  leftName: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 20
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.addressText,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // rightBadge: {},
});
