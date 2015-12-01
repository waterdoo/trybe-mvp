/*
* @Author: vincetam
* @Date:   2015-10-23 16:05:18
* @Last Modified by:   VINCE
* @Last Modified time: 2015-11-30 17:53:27
*/

'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var createWorkoutConstants = require('../constants/createWorkoutConstants');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var copyObjectHelper = require('../common/copyObjectHelper');

var EXERCISE_TEMPLATE = {
  name: null,
  reps: null,
  load: {units: 'lbs', val: null},
  time: null,
  distance: {units: null, val: null},
  url: null
};

var PART_TEMPLATE = {
  instructions: null,
  media: {
    title: null,
    url: null
  },
  exercises: [],
  notes: null
};

var WORKOUT_TEMPLATE = {
  id: null,
  username: null,
  trybe: null,
  day: null,
  createdAt: null,
  type: null,
  parts: [PART_TEMPLATE],
  origin: null,
  finalResult: {type: 'Time', value: null}
};

var _store = {
  workout: WORKOUT_TEMPLATE,
  targetPartIdx: 0, //default val for editing workout
  targetExerciseIdx: 0, //default val for editing workout
};

var addExercise = function(data){
  var partIdx = data.partIdx;
  var newExerciseObj = copyObjectHelper(EXERCISE_TEMPLATE);
  _store.workout.parts[partIdx].exercises.push(newExerciseObj);
};

var addPart = function(){
  _store.workout.parts.push(PART_TEMPLATE);
};

var setTargetExerciseIdx = function(data){
  var partIdx = data.partIdx;
  console.log('createWorkoutStore setTargetExerciseIdx partIdx', partIdx);
  var targetIdx = _store.workout.parts[partIdx].exercises.length - 1;
  console.log('createWorkoutStore setTargetExerciseIdx targetIdx', targetIdx);
  _store.targetExerciseIdx = targetIdx;
};

var findExercise = function(data){
  var partIdx = data.partIdx;
  var exIdx = data.exIdx;
  return _store.workout.parts[partIdx].exercises[exIdx];
};

var setExerciseName = function(data) {
  var exName = data.exName;
  var targetExercise = findExercise(data);
  targetExercise.name = exName;
};

var setReps = function(data) {
  //To do: correct the exercise name
  var reps = data.reps;
  var targetExercise = findExercise(data);
  targetExercise.reps = reps;
  console.log('createWorkoutStore setReps changed reps to', reps);
  console.log('createWorkoutStore workout obj:', _store.workout);
};

var setLoad = function(data) {
  var load = data.load;
  var targetExercise = findExercise(data);
  targetExercise.load.val = load;
};

var setHold = function(data) {
  var hold = data.hold;
  var targetExercise = findExercise(data);
  targetExercise.hold = hold;
};

var setDist = function(data) {
  var dist = data.dist;
  var targetExercise = findExercise(data);
  targetExercise.distance.val = dist;
};

var setDistUnit = function(data) {
  var unit = data.unit;
  var targetExercise = findExercise(data);
  targetExercise.distance.units = unit;
};

var createWorkoutStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getWorkout: function(){
    return _store.workout;
  },
  getTargetPartIdx: function(){
    return _store.targetPartIdx;
  },
  getTargetExerciseIdx: function(){
    return _store.targetExerciseIdx;
  },
  //Target exercise being modified or created.
  //Used for reference in createExerciseModal
  getTargetExercise: function(){
    var partIdx = _store.targetPartIdx;
    var exIdx = _store.targetExerciseIdx;
    console.log('createWorkoutStore getTargetExercise exIdx', exIdx);
    return _store.workout.parts[partIdx].exercises[exIdx];
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch (action.actionType) {
    case createWorkoutConstants.ADD_EXERCISE:
      addExercise(action.data);
      break;
    case createWorkoutConstants.SET_TARGET_EXERCISE_IDX:
      setTargetExerciseIdx(action.data);
      break;
    case createWorkoutConstants.SET_EXERCISE_NAME:
      setExerciseName(action.data);
      createWorkoutStore.emit(CHANGE_EVENT);
      break;
    case createWorkoutConstants.SET_REPS:
      setReps(action.data);
      createWorkoutStore.emit(CHANGE_EVENT);
      break;
    case createWorkoutConstants.SET_LOAD:
      setLoad(action.data);
      createWorkoutStore.emit(CHANGE_EVENT);
      break;
    case createWorkoutConstants.SET_HOLD:
      setHold(action.data);
      createWorkoutStore.emit(CHANGE_EVENT);
      break;
    case createWorkoutConstants.SET_DIST:
      setDist(action.data);
      createWorkoutStore.emit(CHANGE_EVENT);
      break;
    case createWorkoutConstants.SET_DISTUNIT:
      setDistUnit(action.data);
      createWorkoutStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = createWorkoutStore;
