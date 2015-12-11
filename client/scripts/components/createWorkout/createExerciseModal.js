/*
* @Author: vincetam
* @Date:   2015-10-29 17:28:28
* @Last Modified by:   vincetam
* @Last Modified time: 2015-12-08 08:15:55
*/

'use strict';

var React = require('react-native');
var createWorkoutStore = require('../../stores/createWorkoutStore');
var createWorkoutActions = require('../../actions/createWorkoutActions');
var editExerciseActions = require('../../actions/editExerciseActions');
var editExerciseStore = require('../../stores/editExerciseStore');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  SegmentedControlIOS,
} = React;

var SelectedSegment = require('./selectedSegment');
// var RepPicker = require('./pickers/repPicker');

//Gets device height for animating app
var {
  height: deviceHeight
} = Dimensions.get('window');

//Gist: This modal lets user edit or create a new exercise.
//If editing an existing exercise, we copy that exercise from createWorkoutStore
//and store a temp exercise obj in editExerciseStore which reflects that copy.
//All changes from user to the exercise go to the editExerciseStore.
//When user saves changes, the exercise obj in editExerciseStore overwrites
//the original targetExercise in createWorkoutStore.

var CreateExerciseModal = React.createClass({
  getInitialState: function() {
    return {
      offset: new Animated.Value(deviceHeight),
      partIdx: createWorkoutStore.getTargetPartIdx(),
      exIdx: createWorkoutStore.getTargetExerciseIdx(),
      targetExercise: createWorkoutStore.getTargetExercise(),
      segmCtrlVal: 0,
      //Initially set currentExercise to reflect targetExercise
      //so downstream components can load with data. However,
      //currentExercise will effectively reflect editExerciseStore's exercise
      currentExercise: createWorkoutStore.getTargetExercise(),
    };
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: 0
    }).start();
    editExerciseStore.addChangeListener(this._onChange);

    //initialize currentExercise with the targetExercise user is editting
    editExerciseActions.initializeExercise(this.state.targetExercise);
  },
  componentWillUnmount: function() {
    editExerciseStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      currentExercise: editExerciseStore.getExercise()
    });
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  setSegmCtrlVal: function(val){
    //Depending on the selected val, the picker should change
    var seg;
    if(val === 'Reps') seg = 0;
    if(val === 'Weight') seg = 1;
    if(val === 'Distance') seg = 2;
    if(val === 'Time') seg = 3;

    this.setState({
      segmCtrlVal: seg
    });
  },
  saveExercise: function(){
    //save exercise from editExerciseStore into createWorkoutStore
    var exercise = this.state.currentExercise;
    createWorkoutActions.saveExercise(exercise);
    this.closeModal();
  },
  render: function() {
    //Gist: Renders a modal for creating or editing an exercise object
    //SelectedSegment component shows a PickerIOS component to edit
    //either reps, load, time, distance, etc. based on user's selection
    //from SegmentedControlIOS

    return (
      <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={this.closeModal}>
                <Text style={styles.headerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitleText}>New Exercise</Text>
              <TouchableOpacity onPress={this.saveExercise}>
                <Text style={styles.headerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={'Exercise Name'}
                placeholderTextColor={'#9B9B9B'}/>
              <View style={{marginTop: 15}}>
                <SegmentedControlIOS
                  values={['Reps', 'Weight', 'Distance', 'Time']}
                  selectedIndex={this.state.segmCtrlVal}
                  //click changes state's segControlIdx
                  onValueChange={(val) => this.setSegmCtrlVal(val)}
                  tintColor={'#4DBA97'}/>
                <SelectedSegment
                  segmCtrlVal={this.state.segmCtrlVal}
                  partIdx={this.state.partIdx}
                  exIdx={this.state.exIdx}
                  currentExercise={this.state.currentExercise} />
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
});

var styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(155, 155, 155, 0.4)',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: 400,
    width: 340,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 3,
    shadowColor: '#9B9B9B',
    shadowOpacity: 8,
  },
  header: {
    height: 40,
    borderBottomWidth: .5,
    borderBottomColor: 'rgba(155, 155, 155, 0.7)',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  headerTitleText: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A'
  },
  headerButtonText: {
    fontFamily: 'Avenir Next',
    fontSize: 15,
    fontWeight: '500',
    color: '#4DBA97',
  },
  body: {
    height: 360
  },
  bodyContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  },
  textInput: {
    height: 40,
    marginTop: 15,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black'
  }
});

module.exports = CreateExerciseModal;