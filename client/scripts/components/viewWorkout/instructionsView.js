/*
* @Author: vincetam
* @Date:   2016-01-18 10:54:00
* @Last Modified by:   vincetam
* @Last Modified time: 2016-01-20 16:24:49
*/

'use strict';

var React = require('react-native');
var editWorkoutActions = require('../../actions/editWorkoutActions');
var modalActions = require('../../actions/modalActions');

var {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} = React;

var InstructionsView = React.createClass({
  handlePress: function(){
    //notify editWorkoutStore which instructions are being modified
    editWorkoutActions.setTargetPartIdx(this.props.partIdx);
    modalActions.openInstructionsModal();
  },
  render: function(){
    if(this.props.isModifying){
      return (
        /* jshint ignore:start */
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.instructionsContainer}>
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.instructionsText}>{this.props.instructions}</Text>
            </View>
            <View style={{position: 'absolute', right: 0, top: 0, marginTop: 10}}>
              <Image source={require('image!disclosureIndicatorWhite')} />
            </View>
          </View>
        </TouchableOpacity>
        /* jshint ignore:start */
      );
    } else {
      return (
        <View style={styles.instructionsContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.instructionsText}>{this.props.instructions}</Text>
          </View>
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  instructionsContainer: {
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
  },
  instructionsText: {
    fontFamily: 'Avenir Next',
    fontSize: 25,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

module.exports = InstructionsView;
