import React, {Component} from 'react';
import {Button, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {getCarts, deleteCart} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import {TouchableHighlight} from 'react-native-gesture-handler';

class ShoppingListScreen extends Component {
  componentDidMount() {
    this.props.getCarts();
  }

  render() {
    let total = 0;

    this.props.listOfCarts.forEach((item) => {
      total = total + parseInt(item.price);
    });

    const styles = {
      shareButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#00BFFF',
      },
      shareButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
      },
    };

    return (
      <View>
        <FlatList
          style={{marginTop: 10, marginBottom: 20, padding: 10}}
          data={this.props.listOfCarts}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({item}) => (
            <TouchableOpacity>
              <Text style={{fontWeight: 'bold'}}>
                {item.title} --- {item.price} ৳
              </Text>

              <TouchableHighlight
                onPress={() => this.props.deleteCart(item.key)}>
                <Text style={{marginTop: 5, color: 'red'}}>Del</Text>
              </TouchableHighlight>
            </TouchableOpacity>
          )}
        />

        <Text>Total = {total} ৳</Text>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => alert('OK')}>
          <Text style={styles.shareButtonText}>Place an Order</Text>
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps, {getCarts, deleteCart})(
  ShoppingListScreen,
);
