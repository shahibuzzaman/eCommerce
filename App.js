import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import NotificationScreen from './components/screens/NotificationScreen';
import CartScreen from './components/screens/CartScreen';
import AuthAndInfo from './components/screens/AuthAndInfo';
import ProductsScreen from './components/ProductsScreen';
import ProductDetails from './components/ProductDetails';
import CartIconBadge from './components/CartIconBadge';
import SubCategories from './components/screens/SubCategories';

import ShoppingCartIcon from './components/ShoppingCartIcon';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import SearchBar from './components/SearchBar';
import SearchBarProducts from './components/SearchBarProducts';
import SearchList from './components/Search/SearchList';
import SearchListHeader from './components/SearchListHeader';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => <SearchBar navigation={navigation} />,
        })}
      />
      <HomeStack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ navigation }) => ({
          title: '',
          headerShown: false,
        })}
      />

      <HomeStack.Screen
        name="SubCategories"
        component={SubCategories}
        options={({ navigation }) => ({
          title: '',
          headerShown: false,
        })}
      />


      <HomeStack.Screen name="Product Details" component={ProductDetails} />
      <HomeStack.Screen
        name="Search"
        component={SearchList}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
      />
    </NotificationStack.Navigator>
  );
};

const CartStack = createStackNavigator();

const CartStackScreen = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="AuthAndInfo" component={AuthAndInfo} />
    </CartStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={state}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <Icon
                    name={focused ? 'ios-home' : 'ios-home'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Notifications') {
                return (
                  <Icon
                    name={focused ? 'ios-notifications' : 'ios-notifications'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Cart') {
                return (
                  <ShoppingCartIcon
                    name={focused ? 'md-cart' : 'md-cart'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Profile') {
                return (
                  <Icon
                    name={focused ? 'md-contact' : 'md-contact'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen
            name="Notifications"
            component={NotificationStackScreen}
          />
          <Tab.Screen name="Cart" component={CartStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
