'use strict';

var React = require('react-native');
var viewWorkoutStore = require('../../stores/viewWorkoutStore');
var viewWorkoutActions = require('../../actions/viewWorkoutActions');
// var modifyWorkoutActions = require('../../actions/modifyWorkoutActions');

//Load components
var ViewWorkoutHeader = require('./viewWorkoutHeader.js');
var ViewWorkoutInstructions = require('./viewWorkoutInstructions.js');
// var ModifyWorkout = require('../modifyWorkout/modifyWorkout.js');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var ViewWorkout = React.createClass({
  getInitialState: function(){
    return {
      isSelectedWorkout: viewWorkoutStore.getIsSelectedWorkout(),
      workout: viewWorkoutStore.getWorkout()
    };
  },
  componentDidMount: function(){
    viewWorkoutStore.addChangeListener(this._onChange);

    //Load trybe's daily workout if user has not selected one
    if(!this.state.isSelectedWorkout) viewWorkoutActions.getWorkout();
  },
  componentWillUnmount: function(){
    viewWorkoutStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      isSelectedWorkout: viewWorkoutStore.getIsSelectedWorkout(),
      workout: viewWorkoutStore.getWorkout()
    });
  },
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  // _handleModifyWorkoutPress: function(workout) {
  //   modifyWorkoutActions.modifyWorkout(workout);

  //   this.props.navigator.push({
  //     title: 'Modify Workout',
  //     component: ModifyWorkout
  //   });
  // },
  render: function(){
    var workout = this.state.workout;

    return (
      <View>
        <View>
          <Text>Fill</Text>
          <Text>Fill</Text>
          <Text>Fill</Text>
          <Text>Fill</Text>
        </View>
        <ViewWorkoutHeader workout={workout} navigator={this.props.navigator}/>
        <ViewWorkoutInstructions workout={workout}/>
        <Text>Start</Text>
      </View>
    );
  }
});

module.exports = ViewWorkout;