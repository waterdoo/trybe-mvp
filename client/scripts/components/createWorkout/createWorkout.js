/*
* @Author: vincetam
* @Date:   2015-10-23 15:04:43
* @Last Modified by:   vincetam
* @Last Modified time: 2015-12-03 15:54:47
*/

'use strict';

var React = require('react-native');
var createWorkoutActions = require('../../actions/createWorkoutActions');
var createWorkoutStore = require('../../stores/createWorkoutStore');
var editExerciseActions = require('../../actions/editExerciseActions');
var editExerciseStore = require('../../stores/editExerciseStore');

var {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity
} = React;

//Load components
import {TableView, Section, CustomCell} from 'react-native-tableview-simple';
var DateCell = require('./dateCell');
var CreateInstructionsCell = require('./createInstructionsCell');
var CreateExerciseCell = require('./createExerciseCell');
var AddExerciseCell = require('./addExerciseCell');

var CreateWorkout = React.createClass({
  getInitialState: function() {
    return {
      workout: createWorkoutStore.getWorkout(),
    };
  },
  componentDidMount: function() {
    createWorkoutStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    createWorkoutStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      workout: createWorkoutStore.getWorkout(),
    });
  },

  render: function(){
    var TEMP_PART_INDEX = 0;

    var exercisesOfPart1 = this.state.workout.parts[0].exercises
    .map((exercise, index) =>
      /* jshint ignore:start */
      <View style={styles.customCellBackground} key={index}>
        <CreateExerciseCell
          exercise={exercise}
          partIdx={TEMP_PART_INDEX}
          exIdx={index}
          openExerciseModal={this.props.openExerciseModal} />
        <View style={styles.cellSeparatorBackground}>
          <View style={styles.cellSeparatorLine}></View>
        </View>
      </View>
      /* jshint ignore:end */
    );


    return (

      /* jshint ignore:start */
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.stage}>
          <TableView>
            <Section>
              <DateCell />
            </Section>
            <Section header="PART 1" hideSeparator={true}>
              <CreateInstructionsCell/>
              {exercisesOfPart1}
              <AddExerciseCell partIdx={TEMP_PART_INDEX} openExerciseModal={this.props.openExerciseModal} />
            </Section>
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
              <Image
                style={{height: 14, width: 14, marginTop: 4, marginRight: 8}}
                source={require('image!addButton')} />
              <Text style={{flex: 1, fontSize: 16, color: '#9B9B9B', fontFamily: 'Avenir Next'}}>Add Part</Text>
            </View>
          </TableView>
        </ScrollView>
      </View>
      /* jshint ignore:end */
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
  cellSeparatorBackground: {
    backgroundColor: '#fff',
  },
  cellSeparatorLine: {
    marginLeft: 15,
    height: 0.5,
    backgroundColor: '#c8c7cc',
  }
});

module.exports = CreateWorkout;
