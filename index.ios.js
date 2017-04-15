/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'mobx-react/native';

import NativeComponent from './app/nativeComponent';
import WebComponent from './app/webComponent';
import Store from './app/store';
const store = new Store();

export default class WebViewMessaging extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <NativeComponent store={store} />
        <WebComponent store={store} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
});

AppRegistry.registerComponent('WebViewMessaging', () => WebViewMessaging);
