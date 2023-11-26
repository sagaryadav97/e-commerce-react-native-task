import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../../utils/images';
import {COLORS} from '../../utils/colors';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import {
  ActionTypes,
  ProductType,
  useProducts,
} from '../../contexts/Product.Context';
import {FavActionTypes, useFavorites} from '../../contexts/Favorite.Context';

const screenWidth = Dimensions.get('window').width - 40;

const Product = ({title, images, id, price, stock}: ProductType) => {
  const {state, dispatch} = useProducts();
  const {state: favoritesState, dispatch: favoritesDispatch} = useFavorites();
  const productObj = {
    id,
    price,
    stock,
    title,
    images,
  };
  const existingCartItem = state?.cart?.find(item => item.productId === id);

  const getProductInCart = (productId: number) => {
    return state.cart.find(cartItem => cartItem.productId === productId);
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

  const isProductLiked = (productId: number) =>
    favoritesState.likedProducts.includes(productId);

    const toggleFavorite = (product: ProductType) => {
        if (favoritesState.likedProducts.includes(product.id)) {
          // If the product is liked, unlike it
          favoritesDispatch({ type: FavActionTypes.UNLIKE, payload: { productId: product.id } });
        } else {
          // If the product is not liked, like it
          favoritesDispatch({ type: FavActionTypes.LIKE, payload: { productId: product.id } });
        }
      };

  return (
    <View style={styles.productWrapper}>
      <View style={styles.imageFav}>
        {images?.length > 0 ? (
          <Image source={{uri: images[0]}} style={styles.imageFilled} />
        ) : (
          <Image source={IMAGES.ImageGray} style={styles.image} />
        )}
        {isProductLiked(productObj.id) ? (
          <TouchableOpacity style={styles.favContainer} onPress={() => toggleFavorite(productObj)}>
            <Image source={IMAGES.HeartFilled} style={styles.fav} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.favContainer} onPress={() => toggleFavorite(productObj)}>
            <Image source={IMAGES.Heart} style={styles.fav} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleWrapper}>
        <View style={styles.left}>
          <Text style={styles.price}>$ {price}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {title}
          </Text>
        </View>
        <View style={styles.right}>
          {existingCartItem ? (
            <View style={styles.cartFlex}>
              <TouchableOpacity
                onPress={() => subtractFromCart(productObj)}
                style={styles.circlePlus}>
                <OcticonsIcons
                  size={15}
                  name="dash"
                  color={COLORS.whiteColor}
                />
              </TouchableOpacity>
              <Text>{getProductInCart(id)?.quantity}</Text>
              <TouchableOpacity
                onPress={() => addToCart(productObj)}
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
              onPress={() => addToCart(productObj)}
              style={styles.circle}>
              <OcticonsIcons size={28} name="plus" color={COLORS.whiteColor} />
            </TouchableOpacity>
          )}
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
    overflow: 'hidden',
  },
  imageFav: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFilled: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  favContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    left: 5,
  },
  fav: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  price: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '700',
  },
  name: {
    fontSize: 12,
    width: 120,
    color: COLORS.productName,
    fontWeight: '600',
    paddingRight: 10,
  },
  titleWrapper: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleMinus: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePlus: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartFlex: {
    flexDirection: 'row',
    //    backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    right: -5,
    top: -20,
    width: 80,
  },
  // circle: {},
});
