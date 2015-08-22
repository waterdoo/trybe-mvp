'use strict';

var React = require('react-native');
var doWorkoutActions = require('../../../actions/doWorkoutActions');

//Load components
var Exercise = require('../../doWorkout/doExercise');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PickerIOS
} = React;

//Create picker options for modifying workout
var TIME_CHOICES = [1,2,3,4,5,6,7,8,9,10,15,20,25,30];

var PickerItemIOS = PickerIOS.Item;

var EditAMRAP = React.createClass({
  getInitialState: function() {
    return {
      workout: this.props.workout,
      isEditingTime: false,
    };
  },
  toggleEditTime: function() {
    this.setState({
      isEditingTime: !this.state.isEditingTime
    });
  },
  setTime: function(num){
    //If num is not two digits, add zero to front
    num = ('0' + num).slice(-2);
    var time = '00:' + num + ':00';
    this.state.workout.time = time;

    this.setState({
      workout: this.state.workout
    });
  },
  render: function(){
    //The round is an array of exercises
    var roundElements = [];
    var workout = this.state.workout;
    var rounds = this.state.workout.rounds;

    var renderRound = function(rounds) {
      //AMRAP workout obj only has 1 round
      var currRound = rounds.round1;
      titleRound(currRound);
      renderExercisesOfRound(currRound);
    };

    var titleRound = function(round){
      /* jshint ignore:start */
      var roundHeader = <Text>Each Round</Text>;
      roundElements.push(roundHeader);
      /* jshint ignore:end */
    };

    var renderExercisesOfRound = function(round) {
      for(var ex in round) {
        var currExercise = round[ex];
        /* jshint ignore:start */
        var exerciseElement = <Exercise exercise={currExercise}/>;
        roundElements.push(exerciseElement);
        /* jshint ignore:end */
      }
    };

    renderRound(rounds);

    return (
      /* jshint ignore:start */
      <View>
        <TouchableHighlight
          onPress={ () => this.toggleEditTime() }>
          <Text>{this.state.workout.time}</Text>
        </TouchableHighlight>
        <PickerIOS
          selectedValue={Number(this.state.workout.time.slice(3,5))}
          onValueChange={(num) => this.setTime(num)}>
          {TIME_CHOICES.map((num) =>
            <PickerItemIOS
              key={num}
              value={num}
              label={num.toString() + ' min'}/>
          )}
        </PickerIOS>
        {roundElements}
      </View>

      /* jshint ignore:end */
    );
  },
});

module.exports = EditAMRAP;