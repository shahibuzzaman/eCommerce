import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, Keyboard} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Products from '../Products';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      searchBarFocused: false,
      navigation: this.props.navigation,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();

    this.keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );

    this.keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );

    this.keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  keyboardDidShow = () => {
    this.setState({searchBarFocused: true});
  };

  keyboardWillShow = () => {
    this.setState({searchBarFocused: true});
  };

  keyboardWillHide = () => {};

  makeRemoteRequest = () => {
    const url = `https://fadoll.com/wc-api/v3/products?&consumer_key=ck_dd172b0edbf112bd76904a6112291370a4403aaf&consumer_secret=cs_b989504ffc25f1e7e538e107001c1091871557dc`;
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
      <Animatable.View animation="slideInRight" duration={500}>
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          autoFocus={true}
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </Animatable.View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{
            backgroundColor: this.state.searchBarFocused
              ? 'rgba(0,0,0,0.3)'
              : 'white',
          }}
          data={this.state.data}
          renderItem={({item}) => (
            <View>
              {/* <ListItem title={`${item.title} `} subtitle={item.price} /> */}
              <Products item={item} navigation={this.state.navigation} />
            </View>
          )}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={this.renderHeader}
          numColumns={2}
        />
      </View>
    );
  }
}

export default FlatListDemo;
