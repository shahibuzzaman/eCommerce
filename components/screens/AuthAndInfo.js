import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '../../firebase';

export default function AuthAndInfo({navigation}) {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      const {currentUser} = firebase.auth();
      console.log('current user', currentUser);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (user) {
    var ref = firebase.database().ref('/users/' + user.phoneNumber);
    ref.set({phone: user.phoneNumber, address: address});
    navigation.navigate('Cart');
    return (
      <View>
        <Text>{user.phoneNumber}</Text>
      </View>
    );
  } else {
    if (!confirm) {
      return (
        <View>
          <Text>Address</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber('+8801631615049')}
          />
        </View>
      );
    } else {
      return (
        <>
          <Text>Code</Text>
          <TextInput value={code} onChangeText={(text) => setCode(text)} />
          <Button title="Confirm" onPress={() => confirmCode()} />
        </>
      );
    }
  }
}
