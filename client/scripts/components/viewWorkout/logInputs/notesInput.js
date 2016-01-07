/*
* @Author: vincetam
* @Date:   2016-01-06 19:43:49
* @Last Modified by:   vincetam
* @Last Modified time: 2016-01-07 10:41:22
*/

'use strict';

var React = require('react-native');
var logModalActions = require('../../../actions/logModalActions');

var {
  View,
  StyleSheet,
  Text,
  TextInput
} = React;

var NotesInput = React.createClass({
  _setNotes: function(text){
    // logModalActions.setResultCustom(val);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.props.notes}
          placeholder='Workout Notes'
          onChangeText={(text) => this._setNotes(text)}
          multiline={true}
          style={styles.instructionsTextInput} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  instructionsTextInput: {
    height: 60,
    fontFamily: 'Avenir Next',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#929292',
    marginTop: 10,
  },
});

module.exports = NotesInput;