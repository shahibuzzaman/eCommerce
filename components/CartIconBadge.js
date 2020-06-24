import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

function IconWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function CartIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={props.CartItems.length} />;
}

const mapStateToProps = (state) => {
  return {
    CartItems: state,
  };
};

export default connect(mapStateToProps)(CartIconWithBadge);
