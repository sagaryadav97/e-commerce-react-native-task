import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import CartHeader from '../components/headers/CartHeader';
import {COLORS} from '../utils/colors';
import {
  ActionTypes,
  ProductType,
  useProducts,
} from '../contexts/Product.Context';
import OcticonsIcons from 'react-native-vector-icons/Octicons';

const DeliveryCharge = 20;

const CartScreen = () => {
  const {state, dispatch} = useProducts();

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

  const renderItem = (props: {item: {product: ProductType}}) => {
    // console.log(props.item.product.images[0]);
    const product = props.item.product;
    return (
      <>
        <View style={styles.cartBox}>
          <View style={styles.imageText}>
            <Image source={{uri: product?.images[0]}} style={styles.image} />
            {/* <View style={styles.cartImage}></View> */}
            <View style={styles.texts}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                {product.title}
              </Text>
              <Text style={styles.price}>$ {product.price}</Text>
            </View>
          </View>
          <>
            <View style={styles.cartFlex}>
              <TouchableOpacity
                onPress={() => subtractFromCart(product)}
                style={styles.circlePlus}>
                <OcticonsIcons size={15} name="dash" color={COLORS.black} />
              </TouchableOpacity>
              <Text>{getProductInCart(product?.id)?.quantity}</Text>
              <TouchableOpacity
                onPress={() => addToCart(product)}
                style={styles.circleMinus}>
                <OcticonsIcons size={20} name="plus" color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </>
        </View>
      </>
    );
  };

  return (
    <View style={styles.body}>
      <CartHeader />
      {state.cart.length > 0 ? (
        <>
          <View style={styles.flatListBody}>
            <FlatList
              data={state?.cart}
              keyExtractor={item => item.productId.toString()}
              renderItem={renderItem}
            />
          </View>

          <View style={styles.cartTotal}>
            <View style={styles.totalValues}>
              <Text style={styles.left}>Subtotal</Text>
              <Text style={styles.right}>$ {state.total}</Text>
            </View>
            <View style={styles.totalValues}>
              <Text style={styles.left}>Delivery</Text>
              <Text style={styles.right}>$ {DeliveryCharge}</Text>
            </View>
            <View style={styles.totalValues}>
              <Text style={styles.left}>Total</Text>
              <Text style={styles.right}>$ {state.total + DeliveryCharge}</Text>
            </View>
            <TouchableOpacity
              // onPress={() => addToCart(product)}
              style={styles.btn}>
              <Text style={styles.btnText}>Proceed To checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.noText}>Cart is empty</Text>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.whiteColor,
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  circleMinus: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: COLORS.addressText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePlus: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: COLORS.addressText,
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
  cartBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: COLORS.addressText,
    paddingBottom: 20,
    paddingTop: 20,
  },
  imageText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texts: {
    paddingLeft: 20,
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    width: 150,
  },
  price: {
    color: COLORS.black,
    fontSize: 14,
  },
  cartTotal: {
    margin: 20,
    padding: 30,
    backgroundColor: COLORS.addressText,
    borderRadius: 50,
  },
  totalValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  left: {
    fontSize: 18,
  },
  right: {
    fontSize: 18,
  },
  btn: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  btnText: {
    color: COLORS.whiteColor,
    fontSize: 18,
  },
  flatListBody: {
    // color: COLORS.whiteColor,
    height: 400,
  },
  noText: {
    color: COLORS.addressTitle,
    fontSize: 20,
    textAlign: 'center',
  },
});
