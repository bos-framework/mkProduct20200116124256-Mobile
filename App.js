/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, AsyncStorage, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import NetworkService from './src/Network/NetworkService';
import Remote from './src/Config/remote';
import Constants from './src/Utilities/constants';
import store from './src/store/store';

import AuthStackNavigator from './src/Navigator/AuthNavigator';
import DrawerNavigator from './src/Navigator/AppNavigator';



/* 
Switch App root navigation based on the Role based LoggedIn 
*/
const getRootNavigator = LoggedIn =>

  createSwitchNavigator({
    Auth: AuthStackNavigator,
    App: DrawerNavigator
  },
    {
      initialRouteName: LoggedIn ? "App" : "Auth"
    }
  );


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: null  // initial set isLoggedIn status with null.
    };
    this.configuration();
    this._bootstrap();
  }


  configuration() {

    try {
      NetworkService.configuration(options = {
        baseUrl: Remote.BASE_URL,
        appKey: Remote.APP_KEY
      }).catch(e => {
        alert(e);
      });
    }
    catch (e) {
      alert(e);
    }

  }

  /* 
    To check if user already logged In. 
    If userId exists in App local storage (AsyncStorage) update to component state with status.
  */
  _bootstrap = async () => {
    try {
      AsyncStorage.getItem(Constants.USERID).then((userDetails) => {
        this.setState({
          isLoggedIn: userDetails != null
        })
      });
    } catch (error) {
      this.setState({ isLoggedIn: false })
    }
  }

  render() {

    if (this.state.isLoggedIn != null) {

      // Get a root navigation based on the stauts of isLoggedIn property in state
      // If it is isLoggedIn = true -> Navigated to App(Home)
      // If it is isLoggedIn = false -> Navigated to Auth(Login)

      const rootNavigator = getRootNavigator(this.state.isLoggedIn);
      const AppContainer = createAppContainer(rootNavigator);
      return (<Provider store={store}>
        <AppContainer />
      </Provider>);
    } else {
      {/* Render a loader/sipnner component with initial render */ }
      return (<View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});