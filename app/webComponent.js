import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
} from 'react-native';

import { reaction } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class WebComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    this.reactToMessage = reaction(
      () => this.props.store._messageFromNative,
      message => this._forwardMessageToWebView(message)
    );
  }

  componentWillUnmount() {
    this.reactToMessage();
  }

  _forwardMessageToWebView(message) {
    if (this.webview) {
      this.webview.postMessage(message)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>WEBVIEW COMPONENT</Text>
        <WebView
          ref={ref => { this.webview = ref }}
          onMessage={this._handleMessage.bind(this)}
          source={require('./webview.html')}
        />
      </View>
    );
  }

  _handleMessage(e) {
    this.props.store.sendMessageToNative(e.nativeEvent.data);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});