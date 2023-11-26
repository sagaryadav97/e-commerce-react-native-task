import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/colors';
import Header from '../components/headers/Header';
import Search from '../components/Search/Search';
import Address from '../components/address/Address';
import Product from '../components/products/Product';
import {getProductsUrl} from '../service/Apis';
import axios from 'axios';

const numColumns = 2;

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

  const renderItem = ({item}) => (
    <Product
    //  title={item.title} description={item.description}
    />
  );

  return (
    <>
      {/* <ScrollView style={styles.scrollContainer}> */}
        <View style={styles.body}>
          {productsData && (
            <FlatList
              data={productsData}
              renderItem={renderItem}
              numColumns={numColumns}
              keyExtractor={item => item.id}
              // onRefresh={() => console.log('refreshing')}
              contentContainerStyle={styles.list}
              ListHeaderComponent={() => (
                <>
                  <View style={styles.sectionContainer}>
                    <Header userName="Rahul" />
                    <Search />
                    <Address />
                  </View>
                  <Text style={styles.text}>Recommended</Text>
                </>
              )}
            />
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
