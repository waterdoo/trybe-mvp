/*
* @Author: vincetam
* @Date:   2015-09-15 17:29:47
* @Last Modified by:   VINCE
* @Last Modified time: 2015-09-25 10:43:23
*/

//Deprecated on 9/24/15, as no longer using workout objects with
//diff types of workouts(ie. AMRAP). Instead, using one workout structure.

// 'use strict';

// var React =  require('react-native');

// var {
//   View,
//   StyleSheet,
//   Text,
//   TouchableHighlight
// } = React;

// var RoundTally  = React.createClass({
//   increaseRounds: function(){
//     //Doesn't update view, though it does update object
//     var rounds = Number(this.props.workout.finalResult.value);
//     rounds++;
//     var roundsString = rounds.toString();
//     this.props.workout.finalResult.value = roundsString;
//   },
//   render: function(){
//     var roundsCompleted = this.props.workout.finalResult.value;

//     return (
//       /* jshint ignore:start */
//       <View>
//         <Text>{roundsCompleted}</Text>
//         <TouchableHighlight
//           onPress={() => this.increaseRounds()}>
//           <Text>O</Text>
//         </TouchableHighlight>
//       </View>
//       /* jshint ignore:end */
//     );
//   }
// });

// module.exports = RoundTally;