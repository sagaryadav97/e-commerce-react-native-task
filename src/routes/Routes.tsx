import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Product from '../screens/Product';
import {images} from '../utils/images';
import Favourite from '../screens/Favourite';
import More from '../screens/More';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: 80,
        elevation: 14,
        backgroundColor: 'transparent',
        shadowRadius: 20,
        shadowColor: '#00000',
        shadowOpacity: 0.5,
        position: 'absolute',
      },
    }}>
    <Tab.Screen
      name="StoresList"
      component={Home}
      options={{
        tabBarActiveBackgroundColor: 'red',
        tabBarInactiveBackgroundColor: 'red',
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#3e5b35' : 'gray',
              top: -10,
            }}>
            Home
          </Text>
        ),
        tabBarIcon: ({focused}) => (
          <>
            <View>
              {focused ? (
                <View
                style={{
                    backgroundColor: 'transparent',
                    padding: 10,
                    borderRadius: 50
                  }}
                >
                  <View
                   style={{
                    backgroundColor: 'green',
                    padding: 10,
                    borderRadius: 50
                  }}
                  >
                <Image style={styles.section} source={images.home} />
                </View>
                </View>
              ) : (
                <View
                style={{
                    backgroundColor: 'transparent',
                    padding: 10,
                    borderRadius: 50
                  }}
                >
                  <View
                   style={{
                    backgroundColor: 'green',
                    padding: 10,
                    borderRadius: 50
                  }}
                  >
                    <Image style={[styles.section]} source={images.homeClean} />
                    </View>
                    </View> 
              )}
            </View>
          </>
        ),
      }}
    />
    <Tab.Screen
      name="Product"
      component={Product}
      options={{
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#3e5b35' : 'gray',
              top: -10,
            }}>
            Support
          </Text>
        ),
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image style={styles.section} source={images.CategoryColor} />
          ) : (
            <Image style={styles.section} source={images.Category} />
          ),
      }}
    />
    <Tab.Screen
      name="Favourite"
      component={Favourite}
      options={{
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#3e5b35' : 'gray',
              top: -10,
            }}>
            Support
          </Text>
        ),
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image style={styles.section} source={images.Heart} />
          ) : (
            <Image style={styles.section} source={images.Heart} />
          ),
      }}
    />
    <Tab.Screen
      name="More"
      component={More}
      options={{
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#3e5b35' : 'gray',
              top: -10,
            }}>
            Support
          </Text>
        ),
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image style={styles.section} source={images.more_vertical} />
          ) : (
            <Image style={styles.section} source={images.more_vertical} />
          ),
      }}
    />
  </Tab.Navigator>
);

const RoutesContainer = () => (
  <>
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  </>
);

export default RoutesContainer;

const styles = StyleSheet.create({
  section: {
    height: 35,
    width: 35,
  },
});
