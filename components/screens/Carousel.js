import React, {PureComponent} from 'react';
import {Image, StyleSheet, ScrollView, Dimensions, View} from 'react-native';
import {Box} from 'react-native-design-utility';

const {width: WIDTH} = Dimensions.get('window');

const images = [
  require('../assets/img1.jpg'),
  require('../assets/img2.jpg'),
  require('../assets/img3.jpeg'),
];

const DOT_SIZE = 8;
const TIME = 5000;

class DealCaroussel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };

    this.scrollView = React.createRef();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.handleScroll();
    }, TIME);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleScroll = () => {
    const newIndex = this.state.currentIndex + 1;

    if (newIndex < images.length) {
      this.scrollView.current.scrollTo({
        x: newIndex * WIDTH,
        animated: true,
      });

      this.setState({currentIndex: newIndex});
    } else {
      this.scrollView.current.scrollTo({
        x: 0,
        animated: true,
      });
      this.setState({currentIndex: 0});
    }
  };

  onScroll = (event) => {
    const {contentOffset} = event.nativeEvent;

    const currentIndex = Math.round(contentOffset.x / WIDTH);

    if (this.state.currentIndex !== currentIndex) {
      this.setState({currentIndex});
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          margin: 10,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0.5, height: 0.5},
          shadowOpacity: 0.5,
          shadowRadius: 3,
          elevation: 3,
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={this.scrollView}
          scrollEventThrottle={16}
          onScroll={this.onScroll}>
          {images.map((img, i) => (
            <Box
              key={i}
              position="relative"
              style={{height: 240, width: WIDTH}}>
              <Image source={img} />
            </Box>
          ))}
        </ScrollView>
        <Box
          position="absolute"
          dir="row"
          style={{height: 270, width: WIDTH}}
          align="end"
          justify="center"
          pb="xs">
          {Array.from({length: images.length}).map((_, index) => (
            <Box
              key={index}
              bg={this.state.currentIndex === index ? 'black' : 'transparent'}
              style={{borderWidth: 1, borderColor: 'black', margin: -10}}
              circle={DOT_SIZE}
              mx={DOT_SIZE / 2}
            />
          ))}
        </Box>
      </View>
    );
  }
}

export default DealCaroussel;
