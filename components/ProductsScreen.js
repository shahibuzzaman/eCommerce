import React, {Component} from 'react';

import {Button, Card, SearchBar} from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component';
import {postCart} from '../actions';
import {connect} from 'react-redux';
import {
  Image,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Products from './Products';
import Icon from 'react-native-vector-icons/Ionicons';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      categorySlug: this.props.route.params.categorySlug,
      navigation: this.props.navigation,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url =
      'https://fadoll.com/wc-api/v3/products/?&filter[category]=' +
      this.state.categorySlug +
      '&consumer_key=ck_dd172b0edbf112bd76904a6112291370a4403aaf&consumer_secret=cs_b989504ffc25f1e7e538e107001c1091871557dc';
    this.setState({loading: true});

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res.products,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.products;
      })
      .catch((error) => {
        this.setState({error, loading: false});
      });
  };

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.title.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => {
            return (
              <View style={{padding: 0}}>
                <Products item={item} navigation={this.state.navigation} />
              </View>
            );
          }}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={this.renderHeader}
          numColumns={2}
        />
      </View>
    );
  }
}

export default connect(null, {postCart})(ProductsScreen);
