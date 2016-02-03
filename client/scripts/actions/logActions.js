/*
* @Author: VINCE
* @Date:   2015-09-25 14:07:47
* @Last Modified by:   vincetam
* @Last Modified time: 2016-02-01 09:46:53
*/

'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var logConstants = require('../constants/logConstants');

var newWorkout = require('../common/newWorkout');
var newObject = require('../common/copyObjectHelper');
var sortByDate = require('../common/sortByDate');

var WORKOUT_MODEL = require('../../../Documentation/workoutModel');

var logActions = {
  getWorkouts: function() {
    //To do: make get req to server
    var DUMMY_WORKOUT = newWorkout(WORKOUT_MODEL);
    DUMMY_WORKOUT.id = 2;
    DUMMY_WORKOUT.date = new Date('December 17, 2015 03:24:00');
    DUMMY_WORKOUT.parts[0].notes = 'Feeling an improvement from last time I did this, about two months ago';

    var DUMMY_WORKOUT_2 = newWorkout(WORKOUT_MODEL);
    DUMMY_WORKOUT_2.date = new Date('December 21, 2015 03:24:00');
    DUMMY_WORKOUT_2.id = 3;
    DUMMY_WORKOUT_2.parts.push(newObject(DUMMY_WORKOUT.parts[0]));

    var DUMMY_WORKOUT_3 = newWorkout(WORKOUT_MODEL);
    DUMMY_WORKOUT_3.date = new Date('December 11, 2015 03:24:00');
    DUMMY_WORKOUT_3.id = 3;
    DUMMY_WORKOUT_3.parts.push(newObject(DUMMY_WORKOUT.parts[0]));

    var DUMMY_WORKOUTS = [
      DUMMY_WORKOUT,
      DUMMY_WORKOUT_2,
      DUMMY_WORKOUT_3
    ];

    sortByDate.mergeSort(DUMMY_WORKOUTS, 0, DUMMY_WORKOUTS.length);

    this.setWorkouts(DUMMY_WORKOUTS);
  },
  setWorkouts: function(workouts) {
    AppDispatcher.handleAction({
      actionType: logConstants.SET_LOG_WORKOUTS,
      data: {
        workouts: workouts
      }
    });
  },
  //manually save a workout part's results to log
  //for immediate rendering
  addWorkoutPart: function(workout, partIdx){
    AppDispatcher.handleAction({
      actionType: logConstants.ADD_WORKOUT_PART,
      data: {
        workout: workout,
        partIdx: partIdx
      }
    });
  }
};

module.exports = logActions;
