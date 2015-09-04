//No longer used on 9/4/15

// 'use strict';

// var React = require('react-native');
// var modifyWorkoutStore = require('../../../stores/modifyWorkoutStore');
// var modifyWorkoutActions = require('../../../actions/modifyWorkoutActions');

// //Load components
// var EditExercise = require('../editExercise');
// var TimeEdit = require('../editTime');

// var {
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight
// } = React;


// var EditAMRAP = React.createClass({
//   render: function(){
//     var workout = this.props.workout;
//     var rounds = workout.rounds;
//     var timeEdit;
//     var roundElements = []; //Each round is an array of exercise components

//     var renderRound = function(rounds) {
//       /* jshint ignore:start */
//       switch(workout.type) {
//         case 'Custom':
//           var instructions = <Text>{workout.instructions}</Text>;
//           roundElements.push(instructions);
//           break;
//         case 'AMRAP':
//           //AMRAP workout obj only has 1 round that repeats
//           var currRound = rounds.round1;
//           titleRound(currRound);
//           renderExercisesOfRound(currRound, 1);
//           break;
//         case 'Lift':
//         case 'Progressions':
//         case 'Timed Circuit':
//           //Lift workout uses rounds, but they're same as sets
//           for(let i = 1; i <= rounds.numRounds; i++) {
//             roundElements[i] = [];
//             var currRound;
//             //If workout repeats rounds, set currRound to round1
//             if(rounds.repeat) {
//               currRound = rounds['round1'];
//             } else {
//               currRound = rounds['round' + i];
//             }
//             titleRound(currRound, i);
//             renderExercisesOfRound(currRound, i);
//           }
//           break;
//         default:
//           console.log('workout type unknown');
//       }
//       /* jshint ignore:end */
//     };

//     var titleRound = function(round, roundNum){
//       /* jshint ignore:start */
//       switch(workout.type) {
//         case 'Custom':
//           var instructions = <Text>{workout.instructions}</Text>;
//           roundElements.push(instructions);
//           break;
//         case 'AMRAP':
//           var roundHeader = <Text>Each Round</Text>;
//           roundElements.push(roundHeader);
//           break;
//         case 'Lift':
//           var setHeader = <Text>Set {roundNum}</Text>;
//           roundElements[roundNum].push(setHeader);
//           break;
//         case 'Progressions':
//         case 'Timed Circuit':
//           var roundHeader = <Text>Round {roundNum}</Text>;
//           roundElements[roundNum].push(roundHeader);
//           break;
//         default:
//           console.log('workout type unknown');
//       }
//       /* jshint ignore:end */
//     };

//     var renderExercisesOfRound = function(round, roundNum) {
//       for(var ex in round) {
//         var currExercise = round[ex];
//         /* jshint ignore:start */
//         var exerciseElement = <EditExercise exercise={currExercise} exerciseNum={ex} roundNum={roundNum}/>;
//         switch(workout.type) {
//           case 'AMRAP':
//             roundElements.push(exerciseElement);
//             break;
//           case 'Lift':
//           case 'Progressions':
//           case 'Timed Circuit':
//             roundElements[roundNum].push(exerciseElement);
//             break;
//           default:
//             console.log('workout type unknown');
//         }
//         /* jshint ignore:end */
//       }
//     };

//     renderRound(rounds);

//     return (
//       /* jshint ignore:start */
//       <View>
//         <TimeEdit workout={workout}/>
//         {roundElements}
//       </View>
//       /* jshint ignore:end */
//     );
//   },
// });

// module.exports = EditAMRAP;