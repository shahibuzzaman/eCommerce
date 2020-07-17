import firebase from '../firebase';
import DeviceInfo from 'react-native-device-info';

const uniqueId = DeviceInfo.getUniqueId();

export function getCarts() {
  return (dispatch) => {
    firebase
      .database()
      .ref('/cart/' + uniqueId)
      .on('value', (snapshot) => {
        dispatch({
          type: 'CART_FETCH',
          payload: snapshot.val(),
        });

        // dispatch({
        //   type: "BLOGS_LOADING_STATUS",
        //   payload: false,
        // });
      });
  };
}

export function postCart(id, title, price, qnt = 1) {
  console.log('--------', id, title, price, uniqueId);

  return (dispatch) => {
    var ref = firebase.database().ref(`/cart/${uniqueId}`);
    var key = title.replace(/ /g, '@');

    ref.once('value').then(function (snapshot) {
      if (snapshot.child(key).exists()) {
        var specific_child = ref.child(key);
        specific_child.once('value', function (snapshot) {
          var qnt = snapshot.val().qnt + 1;
          ref.child(key).set({ id, title, price, qnt });
        });

        console.log('firebase', 'exists dude!!!');
      } else {
        ref.child(key).set({ id, title, price, qnt });
      }
    });
  };
}

export function updateCart(key, title, price, qnt) {
  console.log(key, title, price, qnt);
  return (dispatch) => {
    var ref = firebase.database().ref(`/cart/${uniqueId}`);
    ref.child(key).set({ title, price, qnt });
  };
}

export function deleteCart(key) {
  return (dispatch) => {
    firebase
      .database()
      .ref('/cart/' + uniqueId + '/' + key)
      .remove();
  };
}
