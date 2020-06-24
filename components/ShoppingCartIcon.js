import React, {Component} from 'react';
import {Alert, Button, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getCarts} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
// import { useNavigation } from "@react-navigation/native";

function IconWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -10,
            top: -5,
            backgroundColor: 'red',
            borderRadius: 50,
            width: 22,
            height: 22,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

class ShoppingCartIcon extends Component {
  componentDidMount() {
    this.props.getCarts();
  }

  render() {
    return (
      <IconWithBadge
        name={this.props.name}
        color={this.props.color}
        size={this.props.size}
        badgeCount={this.props.listOfCarts.length}
      />
    );
  }
}

function mapStateToProps(state) {
  const listOfCarts = _.map(state.cartList.cartList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    listOfCarts,
  };
}

export default connect(mapStateToProps, {getCarts})(ShoppingCartIcon);
