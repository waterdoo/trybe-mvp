'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var viewWorkoutConstants = require('../constants/viewWorkoutConstants');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  isSelectedWorkout: false,
  workout: {}
};

var setIsSelectedWorkout = function(bool) {
  _store.isSelectedWorkout = bool;
};

var setWorkout = function(workout) {
  _store.workout = workout;
};

var viewWorkoutStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getIsSelectedWorkout: function() {
    return _store.isSelectedWorkout;
  },
  getWorkout: function(){
    return _store.workout;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch (action.actionType) {
    case viewWorkoutConstants.SET_DEFAULT_WORKOUT:
      setWorkout(action.data);
      viewWorkoutStore.emit(CHANGE_EVENT);
      break;
    case viewWorkoutConstants.SET_SELECTED_WORKOUT:
      setIsSelectedWorkout(true);
      setWorkout(action.data);
      viewWorkoutStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = viewWorkoutStore;