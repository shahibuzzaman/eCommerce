import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        name="md-search"
        size={30}
        color="black"
        style={{marginLeft: -80}}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.push('Search', {});
        }}
      />

      {/* <Icon
        name="md-notifications"
        size={30}
        color="black"
        style={{marginLeft: -10}}
      /> */}
      <Icon name="md-menu" size={30} color="black" style={{marginLeft: -320}} />
    </View>
  );
};

export default SearchBar;
