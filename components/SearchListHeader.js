import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const SearchListHeader = () => {
  return (
    <View>
      <TextInput placeholder="Search an Item" />
    </View>
  );
};

export default SearchListHeader;
