import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../../utils/colors';
import OcticonsIcons from "react-native-vector-icons/Octicons";

export default function Search() {
  return (
    <View style={styles.searchBoxContainer}>
      <View style={styles.searchBox}>
        <View>
          <OcticonsIcons size={28} name='search' color={COLORS.whiteColor}/>
        </View>
        <View>
          <TextInput
          style={styles.input}
          placeholder='Search Products or store'
          placeholderTextColor={COLORS.searchText}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBoxContainer: {},
  searchBox: {
    backgroundColor: COLORS.searchBoxBg,
    borderRadius: 60 / 2,
    marginHorizontal: 15,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  input: {
    color: COLORS.whiteColor,
    marginLeft: 10,
    fontSize: 18
  },
  // input: {},
  // input: {},
  // input: {},
});