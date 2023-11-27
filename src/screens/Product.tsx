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
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProductHeader from '../components/headers/ProductHeader';
import {COLORS} from '../utils/colors';
import StarRating from 'react-native-star-rating';
import {getProductById} from '../service/Apis';
import axios from 'axios';
import {
  ActionTypes,
  ProductType,
  useProducts,
} from '../contexts/Product.Context';
import {FavActionTypes, useFavorites} from '../contexts/Favorite.Context';
import {IMAGES} from '../utils/images';
import OcticonsIcons from 'react-native-vector-icons/Octicons';

const screenWidth = Dimensions.get('window').width;

interface productProp {
  item: string;
}

const ProductDetails = () => {
  const route = useRoute<any>();
  const {state, dispatch} = useProducts();
  const {state: favoritesState, dispatch: favoritesDispatch} = useFavorites();
  const isProductLiked = (productId: number) =>
    favoritesState.likedProducts.includes(productId);

  const toggleFavorite = (product: ProductType) => {
    if (favoritesState.likedProducts.includes(product.id)) {
      // If the product is liked, unlike it
      favoritesDispatch({
        type: FavActionTypes.UNLIKE,
        payload: {productId: product.id},
      });
    } else {
      // If the product is not liked, like it
      favoritesDispatch({
        type: FavActionTypes.LIKE,
        payload: {productId: product.id},
      });
    }
  };

  const {productId} = route.params;

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

  const navigation = useNavigation<any>();
  const existingCartItem = state?.cart?.find(
    item => item.productId === productData?.id,
  );

  const getProductInCart = (productId: number) => {
    return state.cart.find(cartItem => cartItem.productId === productId);
  };

  const goTocart = () => {
    if (existingCartItem) {
      navigation.navigate('Cart');
      return;
    }
    addToCart(productData);
    navigation.navigate('Cart');
  };

  const addToCart = (product: ProductType) => {
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: {productId: product.id, product, quantity: 1},
    });
    dispatch({type: ActionTypes.CALCULATE_TOTAL});
  };

  const subtractFromCart = (product: ProductType) => {
    dispatch({
      type: ActionTypes.SUBTRACT_FROM_CART,
      payload: {productId: product.id, quantity: 1},
    });
    dispatch({type: ActionTypes.CALCULATE_TOTAL});
  };

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  const renderItem = ({item}:productProp) => (
    <View>
      <Image source={{uri: item}} style={styles.image} />
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
    <ScrollView >
      {productData ? (
        <View style={styles.body}>
          <ProductHeader />
          <View >
            <Text style={styles.productTitle}>{productData.title}</Text>
            {/* <Text style={styles.productCat}>{productData.category}</Text> */}
            <View >
              <Text style={styles.productRatings}>110 Reviews</Text>
            </View>
            <View >
              <View style={styles.imageFav}>
                {isProductLiked(productData?.id) ? (
                  <TouchableOpacity
                    // style={styles.favContainer}
                    onPress={() => toggleFavorite(productData)}>
                    <Image source={IMAGES.HeartFilled} style={styles.fav} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    // style={styles.favContainer}
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
                keyExtractor={item => item.toString()}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
              />
            </View>
            <Text style={styles.productPrice}>$ {productData?.price}</Text>
            <View style={styles.productCart}>
              <View style={styles.cartBtn}>
                {existingCartItem ? (
                  <View style={styles.cartFlex}>
                    <TouchableOpacity
                      onPress={() => subtractFromCart(productData)}
                      style={styles.circlePlus}>
                      <OcticonsIcons
                        size={15}
                        name="dash"
                        color={COLORS.whiteColor}
                      />
                    </TouchableOpacity>
                    <Text>{getProductInCart(productData?.id)?.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => addToCart(productData)}
                      style={styles.circleMinus}>
                      <OcticonsIcons
                        size={20}
                        name="plus"
                        color={COLORS.whiteColor}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => addToCart(productData)}
                    style={styles.btnPlan}>
                    <Text style={styles.btnPlanPrice}>Add To Cart</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                onPress={() => goTocart()}
                style={styles.btnColor}>
                <Text style={styles.btnColorText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productDescription}>
              <Text style={styles.title}>Details</Text>
              <Text style={styles.sub}>
              {productData.description}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator size={42} color={COLORS.cardBg} />
      )}
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
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnColor: {
    width: 160,
    height: 60,
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
    padding: 20,
  },
  sub: {
    color: COLORS.des,
    marginTop: 5,
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
  circleMinus: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePlus: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartFlex: {
    flexDirection: 'row',
    //    backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 120,
  },
  cartBtn: {
    width: 160,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // cartBtn: {},
  // cartBtn: {},
});
