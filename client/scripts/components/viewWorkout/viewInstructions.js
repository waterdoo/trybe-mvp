/*
* @Author: vincetam
* @Date:   2015-12-29 14:32:54
* @Last Modified by:   VINCE
* @Last Modified time: 2015-12-29 15:21:02
*/

'use strict';

var React = require('react-native');
var editWorkoutActions = require('../../actions/editWorkoutActions');

var {
  StyleSheet,
  View,
  TextInput,
} = React;

var ViewInstructions = React.createClass({
  setInstructions: function(instructions) {
    editWorkoutActions.setInstructions(instructions, this.props.partIdx);
  },

  render: function(){
    return (
      /* jshint ignore:start */
      <TextInput
        value={this.props.instructions}
        onChangeText={(text) => this.setInstructions(text)}
        autoCapitalize='words'
        style={styles.instructionsTextInput} />
      /* jshint ignore:end */
    );
  }
});

var styles = StyleSheet.create({
  instructionsTextInput: {
    height: 40,
    fontFamily: 'Avenir Next',
    fontSize: 18
  },
});

module.exports = ViewInstructions;
