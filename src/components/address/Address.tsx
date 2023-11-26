import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import OcticonsIcons from 'react-native-vector-icons/Octicons';

const Address = () => {
  const Icon = () => (
    <OcticonsIcons
      style={styles.icon}
      size={18}
      name="chevron-down"
      color={COLORS.whiteColor}
    />
  );

  return (
    <View style={styles.box}>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <View style={styles.leftTop}>
            <Text style={styles.title}>Delivery to</Text>
          </View>
          <View style={styles.textIcon}>
            <Text style={styles.text}>Green Way 3000, Sylhet</Text>
            <Icon />
          </View>
        </View>
        <View style={styles.containerRight}>
          <View style={styles.rightTop}>
            <Text style={styles.title}>Within</Text>
          </View>
          <View style={styles.textIcon}>
            <Text style={styles.text}>1 Hour</Text>
            <Icon />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  box: {
    height: 100,
    justifyContent:  'flex-end',
    paddingBottom: 10
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.addressTitle,
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    color: COLORS.addressText,
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    paddingLeft: 10,
  },
  // icon: {},
  // icon: {},
});
