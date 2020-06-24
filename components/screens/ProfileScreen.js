import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, Button} from 'react-native';

const ProfileScreen = ({navigation}) => {
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

  if (user) {
    return (
      <View>
        <Text>Your phone number {user.phoneNumber}</Text>
        <Button
          onPress={() =>
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
          }
          title="Sign out"
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> Profile Screen</Text>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
};

export default ProfileScreen;
