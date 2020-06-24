import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBarProducts = ({navigation}) => {
  return (
    <View>
      <View style={{marginRight: 55, marginTop: -5}}>
        <TextInput
          placeholder="Search an Item"
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 25,
            height: 40,
            width: 300,
            paddingLeft: 45,
            fontSize: 13,
            paddingRight: 15,
          }}
        />
        <Icon
          name="md-search"
          size={30}
          color="black"
          style={{marginTop: -35, marginLeft: 10}}
        />
      </View>
      <Icon
        name="md-notifications"
        size={30}
        color="black"
        style={{marginTop: -30, marginLeft: 320}}
      />
    </View>
  );
};

export default SearchBarProducts;
