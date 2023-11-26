import React from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {IMAGES} from '../utils/images';
import {COLORS} from '../utils/colors';

const screenWidth = Dimensions.get('window').width;

const BannerItem = ({banner}) => (
  <View
    style={[
      styles.bannerContainer,
      {
        backgroundColor: banner.bgColor,
      },
    ]}>
    <View style={styles.imageBox}>
      <Image source={IMAGES.ImageGray} style={styles.bannerImage} />
    </View>
    <View style={styles.textBox}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.offer}>
        {banner.offer}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.des}>
        {banner.des}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.orders}>
        {banner.orders}
      </Text>
    </View>
  </View>
);

const BannersList = () => {
  const data = [
    {
      id: '1',
      offer: 'get',
      des: '50% OFF',
      orders: 'ON FIRST 03 ORDER',
      bgColor: '#FFC83A',
    },
    {
      id: '2',
      offer: 'flat',
      des: '50',
      orders: 'ON FIRST 03 ORDER',
      bgColor: '#2A4BA0',
    },
    {
      id: '3',
      offer: 'get',
      des: '50% OFF',
      orders: 'ON FIRST 03 ORDER',
      bgColor: '#153075',
    },
    {
      id: '4',
      offer: 'flat',
      des: '50',
      orders: 'ON FIRST 03 ORDER',
      bgColor: '#F9B023',
    },
    {
      id: '5',
      offer: 'get',
      des: '50% OFF',
      orders: 'ON FIRST 03 ORDER',
      bgColor: '#FFC83A',
    },
    // Add more banner data as needed
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => <BannerItem banner={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: screenWidth - 100,
    margin: 10,
    borderRadius: 30,
    overflow: 'hidden',
    height: 140,
    flexDirection: 'row',
  },
  imageBox: {
    width: 120,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  bannerText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textBox: {
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15
  },
  offer: {
    color: COLORS.whiteColor,
    fontSize: 22,
    textTransform: 'capitalize',
  },
  des: {
    color: COLORS.whiteColor,
    fontSize: 28,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  orders: {
    color: COLORS.whiteColor,
    fontSize: 16,
    textTransform: 'capitalize',
  },
});

export default BannersList;
