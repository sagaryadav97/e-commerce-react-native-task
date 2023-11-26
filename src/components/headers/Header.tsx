import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/images';
import {COLORS} from '../../utils/colors';
import Cart from '../Cart/Cart';

interface headerProps {
  userName: string;
}
const Header = ({userName}: headerProps) => {
    
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.left}>
        <Text style={styles.leftName}>Hey, {userName}</Text>
      </View>
      <View style={styles.right}>
        <Cart />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 140,
    paddingHorizontal: 20,
  },
  leftName: {
    color: COLORS.nameColor,
    fontSize: 20,
    fontWeight: '600',
  },
  imageIcon: {
    height: 30,
    width: 30,
  },
  rightBadge: {
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
  rightBadgeCount: {
    color: COLORS.whiteColor,
  },
  // rightBadge: {},
});
