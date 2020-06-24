import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getCarts, deleteCart, updateCart} from '../../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firebase from '../../firebase';
import DeviceInfo from 'react-native-device-info';

class Item extends Component {
  state = {
    user: {},
    cartList: [{a: 'dfs', b: '3434'}],
  };

  // onAuthStateChanged(user) {
  //   this.setState({user: user});
  // }

  componentDidMount() {
    this.props.getCarts();
    auth().onAuthStateChanged((user) => {
      this.setState({user: user});
    });
  }

  render() {
    let total = 0;

    this.props.listOfCarts.forEach((item) => {
      let mul = parseInt(item.price) * parseInt(item.qnt);
      total = total + mul;
      console.log('total', total);
    });

    console.log('list of carts', this.props.listOfCarts);

    return (
      <ScrollView>
        <FlatList
          data={this.props.listOfCarts}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({item}) => (
            <View style={styles.containerStyle}>
              <View style={styles.textStyle}>
                <Text style={{color: '#2e2f30'}}>{item.title}</Text>
                <View style={styles.priceStyle}>
                  <Text style={{color: '#2e2f30', fontSize: 14}}>
                    {item.price} ৳
                  </Text>
                </View>
              </View>

              <View style={styles.counterStyle}>
                <Icon.Button
                  onPress={() =>
                    this.props.updateCart(
                      item.key,
                      item.title,
                      item.price,
                      item.qnt > 1 ? item.qnt - 1 : 1,
                    )
                  }
                  name="ios-remove"
                  size={25}
                  color="#fff"
                  backgroundColor="#fff"
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#bbb',
                    height: 30,
                    width: 30,
                  }}
                  iconStyle={{marginRight: 0}}
                />

                <Text>{item.qnt}</Text>

                <Icon.Button
                  onPress={() =>
                    this.props.updateCart(
                      item.key,
                      item.title,
                      item.price,
                      item.qnt < 100 ? item.qnt + 1 : 100,
                    )
                  }
                  name="ios-add"
                  size={25}
                  color="#fff"
                  backgroundColor="#fff"
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#bbb',
                    height: 30,
                    width: 30,
                  }}
                  iconStyle={{marginRight: 0}}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.props.deleteCart(item.key)}>
                  <Icon
                    name="md-trash"
                    size={30}
                    color="red"
                    iconStyle={{marginRight: 0}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 20,
          }}>
          <Text style={{fontSize: 20}}>Total = {total} ৳</Text>
        </View>

        <View
          style={{
            backgroundColor: '#f39c12',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            borderRadius: 3,
          }}>
          {this.state.user ? (
            <Text
              onPress={() => {
                var data = [];

                this.props.listOfCarts.forEach((item) => {
                  var obj = {};
                  (obj.title = item.title),
                    (obj.price = item.price),
                    (obj.qnt = item.qnt);
                  data.push(obj);
                });

                var userRef = firebase
                  .database()
                  .ref('/users/' + this.state.user.phoneNumber);

                userRef.once('value', function (snapshot) {
                  var address = snapshot.val().address;
                  var phone = snapshot.val().phone;
                  var orderRef = firebase.database().ref('/orders');
                  orderRef.push({
                    phone: phone,
                    address: address,
                    total: total,
                    products: data,
                  });
                });

                const uniqueId = DeviceInfo.getUniqueId();
                var cartRef = firebase.database().ref('/cart');
                cartRef.child(uniqueId).remove();
              }}
              style={{color: '#fff', fontSize: 24}}>
              Go to checkout
            </Text>
          ) : (
            <Text
              onPress={() => {
                this.props.navigation.push('AuthAndInfo', {
                  otherParam: 'anything you want here',
                });
              }}
              style={{color: '#fff', fontSize: 24}}>
              Go to checkout
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center',
    padding: 10,
    fontSize: 14,
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 60,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
});

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

export default connect(mapStateToProps, {getCarts, deleteCart, updateCart})(
  Item,
);
