import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Product from '../screens/Product';
import { IMAGES } from '../utils/images';
import Favourite from '../screens/Favourite';
import More from '../screens/More';
import { COLORS } from '../utils/colors';
import CustomTabBottom from './CustomTabBottom';
import Categories from '../screens/Categories';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      // tabBarShowLabel: false,
      tabBarStyle: styles.tabBarStyle,
      tabBarLabel: ({ focused, children }) => {
        if (focused) {
          return;
        }
        return <Text style={{ fontSize:12 , paddingBottom :5 ,color: COLORS.tabBarLabelColor}}>{children}</Text>
      },
      tabBarIcon: ({ focused }) => {
        let iconName;

        if (route.name === 'StoresList') {
          iconName = focused ? (
            <Image style={styles.section} source={IMAGES.home} />
          ) : (
            <Image style={styles.section} source={IMAGES.homeClean} />
          );
        } else if (route.name === 'Categories') {
          iconName = focused ? (
            <Image style={styles.section} source={IMAGES.CategoryColor} />
          ) : (
            <Image style={styles.section} source={IMAGES.Category} />
          );
        } else if (route.name === 'Favorite') {
          iconName = focused ? (
            <Image style={styles.section} source={IMAGES.Heart} />
          ) : (
            <Image style={styles.section} source={IMAGES.Heart} />
          );
        } else if (route.name === 'More') {
          iconName = focused ? (
            <Image style={styles.section} source={IMAGES.more_vertical} />
          ) : (
            <Image style={styles.section} source={IMAGES.more_vertical} />
          );
        }

        return iconName;
      },
    })}>
    <Tab.Screen
      name="StoresList"
      component={Home}
      options={{
        tabBarButton: props => <CustomTabBottom route={'StoresList'} {...props} />,
      }}
    />
    <Tab.Screen
      name="Categories"
      component={Categories}
      options={{
        tabBarButton: props => <CustomTabBottom route={'Categories'}{...props} />,
      }}
    />
    <Tab.Screen
      name="Favorite"
      component={Favourite}
      options={{
        tabBarButton: props => <CustomTabBottom route={'Favorite'}{...props} />,
      }}
    />
    <Tab.Screen
      name="More"
      component={More}
      options={{
        tabBarButton: props => <CustomTabBottom route={'More'}{...props} />,
      }}
    />
  </Tab.Navigator>
);

const RoutesContainer = () => (
  <>
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </>
);

export default RoutesContainer;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    elevation: 0,
    bottom: 0,
    left: 5,
    right: 5,
    height: 60,
    position: 'absolute',
    borderTopRightRadius: 20
  },
  section: {
    width: 25,
    height: 25,
  },
});
