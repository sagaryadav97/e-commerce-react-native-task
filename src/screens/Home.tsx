import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/colors';
import Header from '../components/headers/Header';
import Search from '../components/Search/Search';
import Address from '../components/address/Address';
import Product from '../components/products/Product';
import {getProductsUrl} from '../service/Apis';
import axios from 'axios';
import BannersList from '../components/Banners';
import {ProductType} from '../contexts/Product.Context';

const numColumns = 2;
interface productProp {
  item: ProductType;
}

export default function Home() {
  const [productsData, setProductsData] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(getProductsUrl);
      // return response.data;
      setProductsData(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const renderItem = ({item}: productProp) => (
    <Product
      title={item.title}
      id={item.id}
      price={item.price}
      stock={item.stock}
      images={item.images}
      //  title={item.title} description={item.description}
    />
  );

  return (
    <>
      {/* <ScrollView style={styles.scrollContainer}> */}
      <View style={styles.body}>
        {productsData.length > 0 ? (
          <FlatList
            data={productsData}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
            ListHeaderComponent={() => (
              <>
                <View style={styles.sectionContainer}>
                  <Header userName="Rahul" />
                  <Search />
                  <Address />
                </View>
                <BannersList />
                <Text style={styles.text}>Recommended</Text>
              </>
            )}
          />
        ) : (
          <ActivityIndicator size={42} color={COLORS.cardBg} />
        )}
      </View>
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: COLORS.cardBg,
    height: 300,
  },
  body: {
    backgroundColor: COLORS.whiteColor,
    flex: 1,
  },
  list: {
    // argin: 10,
    // width: 300m
    paddingBottom: 80,
  },
  text: {
    marginTop: 10,
    backgroundColor: COLORS.whiteColor,
    color: COLORS.black,
    fontSize: 24,
    fontWeight: '700',
    padding: 10,
    // width: 300
  },
  scrollContainer: {
    flex: 1,
  },
});
