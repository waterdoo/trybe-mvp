'use strict';

require("babel/register");

var React = require('react-native');
var EventEmitter = require('EventEmitter');

//Load components
var TabBar = require('./client/scripts/components/tabBar');
var EditExerciseModal = require('./client/scripts/components/createWorkout/editExercise/editExerciseModal');
var EditPartModal = require('./client/scripts/components/createWorkout/editPart/editPartModal');
var EditDateModal = require('./client/scripts/components/createWorkout/editPart/editDateModal');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

var RouteStack = {
  app: {
    component: TabBar
  }
};

var Trybe = React.createClass({
  getInitialState: function(){
    return {
      exerciseModalVisible: false,
      partModalVisible: false,
      dateModalVisible: false,
    };
  },
  componentWillMount: function() {
    this.navListener = new EventEmitter();
  },
  onDoWorkout: function() {
    //emits event to notify workout navigator to reset stack
    console.log('index onDoWorkout called');
    this.navListener.emit('doWorkout', { someArg: 'argValue' });
  },
  openExerciseModal: function(){
    this.setState({exerciseModalVisible: true});
  },
  closeExerciseModal: function(){
    this.setState({exerciseModalVisible: false});
  },
  openPartModal: function(){
    this.setState({partModalVisible: true});
  },
  closePartModal: function(){
    this.setState({partModalVisible: false});
  },
  openDateModal: function(){
    this.setState({dateModalVisible: true});
  },
  closeDateModal: function(){
    this.setState({dateModalVisible: false});
  },
  renderScene: function(route, navigator){
    var Component = route.component;

    return (
      <Component
        rootNav={this.refs.rootNav}
        openExerciseModal={this.openExerciseModal}
        openPartModal={this.openPartModal}
        openDateModal={this.openDateModal}
        onDoWorkout={this.onDoWorkout}
        events={this.navListener} />
    );
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <View style={styles.container}>
        <Navigator
          ref="rootNav"
          initialRoute={RouteStack.app}
          renderScene={this.renderScene} />
        {this.state.exerciseModalVisible ? <EditExerciseModal closeModal={this.closeExerciseModal}/> : null }
        {this.state.partModalVisible ? <EditPartModal closeModal={this.closePartModal}/> : null }
        {this.state.dateModalVisible ? <EditDateModal closeModal={this.closeDateModal}/> : null }
      </View>
      /* jshint ignore:end */
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('trybe', () => Trybe);
