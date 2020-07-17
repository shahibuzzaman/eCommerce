import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('screen');

import Carousel from './Carousel';

const categoryImage = [];

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const api =
    'https://malamalexpress.com/wp-json/wc/v3/products/categories?consumer_key=ck_af6dae0d921e12528b92964fb526317370642ec1&consumer_secret=cs_d172a15e6fa946ccc01890ca6adec67e3724e667';

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {

    if (item.parent == 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SubCategories', {
              categorySlug: item.slug,
              id: item.id
            });
          }}>
          <View
            style={{
              height: 120,
              width: 123,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              margin: 4,
              borderRadius: 10,
              shadowColor: '#222',
              shadowOffset: { width: 0.5, height: 0.5 },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              elevation: 2,
            }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }


  };

  const keyExtractor = (item) => String(item.id);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 270, marginBottom: 15 }}>
        <Carousel />
      </View>
      <View style={{ padding: 10 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
            <FlatList
              data={categories}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              numColumns={3}
            />
          )}
      </View>
    </View>
  );
};

export default HomeScreen;
