import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import 'firebase/functions';

import Home from './screens/Home';
import Login from './screens/Login';


const AppNavigator = createStackNavigator(
    {
      Home,
      Login
    },

    {
      initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {


  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDdUvn4S6MdMmw_RpOKbMmBiiT8DZimn4s",
      authDomain: "bpdatabase-58f91.firebaseapp.com",
      databaseURL: "https://bpdatabase-58f91.firebaseio.com",
      projectId: "bpdatabase-58f91",
      storageBucket: "bpdatabase-58f91.appspot.com",
      messagingSenderId: "878820946524"
    };
    firebase.initializeApp(config);

    //const myf = firebase.functions().httpsCallable('getArticles')
    var functions = firebase.functions();


  }

  render() {
    return <AppContainer />;
  }
}
