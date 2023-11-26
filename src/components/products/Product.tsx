import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/images';
import {COLORS} from '../../utils/colors';
import OcticonsIcons from "react-native-vector-icons/Octicons";

const screenWidth = Dimensions.get('window').width - 40;


const Product = () => {
  return (
    <View style={styles.productWrapper}>
      <View style={styles.imageFav}>
        <Image source={IMAGES.ImageGray} style={styles.image} />
        <Image source={IMAGES.Heart} style={styles.fav} />
        {/* <Image source={IMAGES.ImageGray} style={styles.filledFav}/> */}
      </View>
      <View style={styles.titleWrapper}>
        <View style={styles.left}>
          <Text style={styles.price}>$325</Text>
          <Text style={styles.name}>Clown Tang.H03</Text>
        </View>
        <View style={styles.right}>
            <View style={styles.circle}>
            <OcticonsIcons size={28} name='plus' color={COLORS.whiteColor}/>

            
            </View>
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  productWrapper: {
    borderRadius: 20,
    backgroundColor: COLORS.nameColor,
    width: screenWidth / 2,
    margin: 10,
    marginVertical: 10,
    flexDirection: 'column',
  },
  imageFav: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  fav: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    left: 5,
  },
  price: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '700',
  },
  name: {
    fontSize: 12,
    color: COLORS.productName,
    fontWeight: '600',
  },
  titleWrapper: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // circle: {},
  // circle: {},
});
