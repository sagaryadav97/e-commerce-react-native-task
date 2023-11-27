import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import ProductHeader from '../components/headers/ProductHeader';
import { COLORS } from '../utils/colors';
import StarRating from 'react-native-star-rating';
import { getProductById } from '../service/Apis';
import axios from 'axios';
import { ProductType } from '../contexts/Product.Context';
import { FavActionTypes, useFavorites } from '../contexts/Favorite.Context';
import { IMAGES } from '../utils/images';
const screenWidth = Dimensions.get('window').width;

const ProductDetails = () => {
  const route = useRoute<any>();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const isProductLiked = (productId: number) =>
    favoritesState.likedProducts.includes(productId);

  const toggleFavorite = (product: ProductType) => {
    if (favoritesState.likedProducts.includes(product.id)) {
      // If the product is liked, unlike it
      favoritesDispatch({
        type: FavActionTypes.UNLIKE,
        payload: { productId: product.id },
      });
    } else {
      // If the product is not liked, like it
      favoritesDispatch({
        type: FavActionTypes.LIKE,
        payload: { productId: product.id },
      });
    }
  };

  const { productId } = route.params;

  const [productData, setProductData] = useState<ProductType>();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const getProduct = async (productId: string) => {
    try {
      const response = await axios.get(getProductById + productId);
      // return response.data;

      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  const renderItem = ({ item }) => (
    <View>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      setCurrentImage(roundIndex);
    },
    [],
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.body}>
        <ProductHeader />
        <View style={styles.productBody}>
          <Text style={styles.productTitle}>Thin Choise</Text>
          <Text style={styles.productCat}>Top Orange</Text>
          <View style={styles.productStars}>
            <Text style={styles.productRatings}>110 Reviews</Text>
          </View>
          <View style={styles.productImages}>
            <View style={styles.imageFav}>
              {isProductLiked(productData?.id) ? (
                <TouchableOpacity
                  style={styles.favContainer}
                  onPress={() => toggleFavorite(productData)}>
                  <Image source={IMAGES.HeartFilled} style={styles.fav} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.favContainer}
                  onPress={() => toggleFavorite(productData)}>
                  <Image source={IMAGES.Heart} style={styles.fav} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.imageList}>
              {productData?.images.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.imageDash,
                    {
                      backgroundColor:
                        index === currentImage
                          ? COLORS.yellow
                          : COLORS.addressText,
                    },
                  ]}></View>
              ))}
            </View>
            <FlatList
              data={productData?.images}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
            />
          </View>
          <Text style={styles.productPrice}>$ {productData?.price}</Text>
          <View style={styles.productCart}>
            <View style={styles.btnPlan}>
              <Text style={styles.btnPlanPrice}>Add To Cart</Text>
            </View>
            <View style={styles.btnColor}>
              <Text style={styles.btnColorText}>Buy Now</Text>
            </View>
          </View>
          <View style={styles.productDescription}>
            <Text style={styles.title}>Details</Text>
            <Text style={styles.sub}>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Nullam quis risus eget urna mollis ornare vel eu leo.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>

  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.whiteColor,
    flex: 1,
  },
  image: {
    width: screenWidth - 40,
    borderRadius: 20,
    marginHorizontal: 20,
    height: 300,
    resizeMode: 'cover',
  },
  imageDash: {
    height: 5,
    width: 20,
    borderRadius: 10,
    backgroundColor: COLORS.addressText,
    marginLeft: 5,
  },
  imageList: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    bottom: 40,
    left: 30,
  },
  imageFav: {
    backgroundColor: COLORS.whiteColor,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 10,
    right: 40,
    top: 20,
  },
  fav: {
    height: 25,
    width: 25,
  },
  btnPlan: {
    width: 160,
    height: 80,
    borderWidth: 1,
    borderColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnColor: {
    width: 160,
    height: 80,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 30,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.blue,
    padding: 20,
  },
  btnPlanPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.blue,
  },
  btnColorText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.whiteColor,
  },
  productCart: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    color: COLORS.black,
  },
  productDescription: {
    padding: 20
  },
  sub: {
    color: COLORS.des,
    marginTop: 5
  },
  productTitle: {
    fontSize: 42,
    color: COLORS.black,
    paddingHorizontal: 20,
    fontWeight: '300',
  },
  productCat: {
    fontSize: 42,
    color: COLORS.black,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  productRatings: {
    padding: 20,
  },
  // sub: {},
});
