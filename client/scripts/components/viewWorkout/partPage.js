/*
* @Author: vincetam
* @Date:   2016-01-16 14:31:53
* @Last Modified by:   vincetam
* @Last Modified time: 2016-01-20 17:05:42
*/

'use strict';

var React = require('react-native');
var editWorkoutActions = require('../../actions/editWorkoutActions');
var modalActions = require('../../actions/modalActions');

var {
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} = React;

var PartNameView = require('./partNameView');
var InstructionsView = require('./instructionsView');
var ExerciseView = require('./exerciseView');
var AddExerciseView = require('./addExerciseView');

var PartPage = React.createClass({
  handleLogButtonPress: function(){
    //set targetPartIdx to notify editWorkoutStore which part
    //is being modified
    editWorkoutActions.setTargetPartIdx(this.props.partIdx);
    modalActions.openLogModal();
  },

  render: function(){
    var exerciseViews = this.props.part.exercises.map( (exercise, index) =>
      /* jshint ignore:start */
      <View style={{width: 330}}>
        <ExerciseView
          exercise={exercise}
          partIdx={this.props.partIdx}
          exIdx={index}
          isModifying={this.props.isModifying} />
      </View>
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <View style={[styles.container, {width: this.props.visibleWidth, height: this.props.visibleHeight}]}>
        <View style={styles.partWheel}>
          <PartNameView
            partName={this.props.part.name}
            partIdx={this.props.partIdx}
            isModifying={this.props.isModifying} />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle} >
          <View style={{width: 330}}>
            <InstructionsView
              instructions={this.props.part.instructions}
              partIdx={this.props.partIdx}
              isModifying={this.props.isModifying} />
          </View>

          {exerciseViews}

          {this.props.isModifying ?
            <AddExerciseView partIdx={this.props.partIdx}/>
            : null
          }
        </ScrollView>

        <TouchableHighlight onPress={this.handleLogButtonPress}
          style={[styles.logButton, {width: this.props.visibleWidth}]}>
          <Text style={styles.logButtonText}>Log Results</Text>
        </TouchableHighlight>
      </View>
      /* jshint ignore:end */
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  partWheel: {
    flex: .2,
    backgroundColor: 'rgba(77,186,151,.6)',
  },
  contentContainerStyle: {
    flex: .8,
    paddingTop: 20,
    paddingBottom: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logButton: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: 'rgba(77,186,151,.6)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logButtonText: {
    fontFamily: 'Avenir Next',
    fontSize: 24,
    fontWeight: '500',
    color: '#fff'
  }
});

module.exports = PartPage;