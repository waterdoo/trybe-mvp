/*
* @Author: vincetam
* @Date:   2015-10-06 16:15:29
* @Last Modified by:   VINCE
* @Last Modified time: 2016-01-09 16:55:14
*/

'use strict';

var React = require('react-native');
var feedActions = require('../../actions/feedActions');

var {
  StyleSheet,
  Text,
  View,
  TextInput
} = React;


var ChatBar = React.createClass({
  getInitialState: function(){
    return {
      chatMessage: '', //To do: reflect from store?
    };
  },
  sendMessage: function(text){
    feedActions.sendMessage(text);
    this.clearMessage();
  },
  clearMessage: function(){
    this.setState({
      chatMessage: ''
    });
  },
  render: function(){
    return (
      <View>
        <TextInput
          style={styles.chatBar}
          value={this.state.chatMessage}
          placeholder={'Send message'}
          onChangeText={(text) => this.setState({chatMessage: text})}
          onSubmitEditing={() => this.sendMessage(this.state.chatMessage)}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  chatBar: {
    height: 30,
    width: 300,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
});

module.exports = ChatBar;
