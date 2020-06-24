import React, {Component} from 'react';

import {Button, Card} from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component';
import {postCart} from '../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Image,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

class Products extends Component {
  render() {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: 280,
            width: 186,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',

            borderRadius: 10,
            shadowColor: '#222',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 2,
          }}>
          <Image
            style={{width: 120, height: 120}}
            source={{
              uri: this.props.item.featured_src,
            }}
          />
          <Text
            style={{
              marginBottom: 10,
              marginTop: 20,
              textAlign: 'center',
            }}
            h2>
            {this.props.item.title}
          </Text>
          <Text style={{padding: 10}} h4>
            {this.props.item.price} ৳
          </Text>
          <View style={{padding: 5, flex: 1, marginLeft: -50}}>
            <Button
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.push('Product Details', {
                  itemId: this.props.item.id,
                  otherParam: 'anything you want here',
                });
              }}
              type="outline"
              title="View Details"
              size={10}
            />
          </View>
          <View style={{flex: 2, marginTop: -30, marginLeft: 120}}>
            <Button
              onPress={() => {
                this.props.postCart(
                  this.props.item.title,
                  this.props.item.price,
                );
              }}
              icon={<Icon name="md-cart" size={23} color="white" />}
              iconRight
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {postCart})(Products);
