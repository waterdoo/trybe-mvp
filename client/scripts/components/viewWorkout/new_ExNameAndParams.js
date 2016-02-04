/*
* @Author: vincetam
* @Date:   2016-02-03 20:25:12
* @Last Modified by:   vincetam
* @Last Modified time: 2016-02-03 21:20:05
*/

'use strict';

var React = require('react-native');
var renderExerciseTime = require('../../common/renderExerciseTime');

var {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

var DistancePicker = require('./exerciseParameterPickers/distancePicker');

//This outputs a line giving the exercise description
//on the left, and its parameters on the right
//Parameters, when clicked, show pickers to allow user to edit them
var ExNameAndParams = React.createClass({
  getInitialState: function(){
    return {
      showPicker: true,
      selectedPicker: null,
    };
  },
  render: function(){
    var exercise = this.props.exercise;
    var exerciseName, repsPress, loadPress, distancePress, timePress;
    var lastExParam;

    var renderExerciseName = function() {
      /* jshint ignore:start*/
      if(exercise.name){
        var lastCharAt = exercise.name.length - 1;
        //If last letter of exercise name is a space, ignore it
        if(exercise.name.charAt(lastCharAt) === ' '){
          var exName = exercise.name.slice(0, lastCharAt);
          exerciseName = <Text style={styles.exerciseText}>{exName}</Text>;
        } else {
          exerciseName = <Text style={styles.exerciseText}>{exercise.name}</Text>;
        }
      } else return null;
      /* jshint ignore:end*/
    };

    var renderReps = function() {
      if(exercise.reps){
        if(lastExParam === 'load' ||
          lastExParam === 'distance' ||
          lastExParam === 'time'){
          //if there is another exercise param to render,
          //add a comma and space
          repsPress =
            <TouchableOpacity>
              <Text style={styles.exerciseText}>{exercise.reps} reps, </Text>
            </TouchableOpacity> ;
        } else {
          repsPress =
            <TouchableOpacity>
              <Text style={styles.exerciseText}>{exercise.reps} reps</Text>
            </TouchableOpacity> ;
        }
      }
    };

    var renderLoad = function() {
      if(exercise.load.val){
        if(lastExParam === 'distance' ||
          lastExParam === 'time'){
          //if there is another exercise param to render,
          //add a comma and space
          loadPress =
            <TouchableOpacity>
              <Text style={styles.exerciseText}>{exercise.load.val}{exercise.load.units}, </Text>
            </TouchableOpacity> ;
        } else {
          loadPress =
            <TouchableOpacity>
              <Text style={styles.exerciseText}>{exercise.load.val}{exercise.load.units}</Text>
            </TouchableOpacity> ;
        }
      }
    };

    var renderDistance = function() {
      if(exercise.distance.val){
        if(lastExParam === 'time'){
          //if there is another exercise param to render,
          //add a comma and space
          distancePress =
            <TouchableOpacity>
              <Text style={styles.exerciseText}>{exercise.distance.val}{exercise.distance.units}, </Text>
            </TouchableOpacity> ;
        } else {
          distancePress =
            <TouchableOpacity>
              <Text style={styles.exerciseText}>{exercise.distance.val}{exercise.distance.units}</Text>
            </TouchableOpacity> ;
        }
      }
    };

    var renderTime = function(){
      if(exercise.time){
        timePress =
          <TouchableOpacity>
            <Text style={styles.exerciseText}>{renderExerciseTime(exercise.time)}</Text>
          </TouchableOpacity> ;
      }
    };

    var findLastExerciseParam = function(){
      //Determines the need of whether a comma is necessary,
      //when there are mroe than one exercise parameters
      //Finds the last param given the set order of:
      //reps, load, distance, time. Once set,
      //renderExercise functions rely on the last param
      if(exercise.time) lastExParam = 'time';
      else if(exercise.distance.val) lastExParam = 'distance';
      else if(exercise.load.val) lastExParam = 'load';
      else if(exercise.reps) lastExParam = 'reps';
    };

    var renderExercise = function() {
      findLastExerciseParam();

      //Render exercise parameters, in this order
      //reps, load, distance, time
      renderExerciseName();
      renderReps();
      renderLoad();
      renderDistance();
      renderTime();
    };

    renderExercise();

    return (
      /* jshint ignore:start */
      <View style={styles.exerciseContainer}>
        <View style={styles.topRow}>
          <View style={styles.leftHalf}>
            {exerciseName}
          </View>

          <View style={styles.rightHalf}>
            {repsPress}
            {loadPress}
            {distancePress}
            {timePress}
          </View>
        </View>

        {this.state.showPicker ?
          <View style={styles.bottomRow}>
            <DistancePicker
              distVal={this.props.exercise.distance.val}
              units={this.props.exercise.distance.units} />
          </View>
          : null
        }
      </View>
      /* jshint ignore:end */
    );
  }
});

var styles = StyleSheet.create({
  exerciseContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  exerciseText: {
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: 25,
    color: '#fff'
  },
  leftHalf: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rightHalf: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomRow: {
  }
});

module.exports = ExNameAndParams;