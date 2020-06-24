import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CategoryCard = ({item, navigation}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          height: 120,
          width: 130,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          margin: 2,
        }}>
        <Text style={{fontSize: 16}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {},
});

export default CategoryCard;
