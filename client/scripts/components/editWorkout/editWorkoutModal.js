/*
* @Author: vincetam
* @Date:   2016-01-12 11:30:40
* @Last Modified by:   VINCE
* @Last Modified time: 2016-01-18 21:23:42
*/

'use strict';

var React = require('react-native');
var editWorkoutStore = require('../../stores/editWorkoutStore');
var editWorkoutActions = require('../../actions/editWorkoutActions');
var modalActions = require('../../actions/modalActions');

var {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  DeviceEventEmitter,
} = React;

//Load components
import {TableView, Section, CustomCell} from 'react-native-tableview-simple';
var DateCell = require('./dateCell');
var Part = require('./editPart/part');

//Gets device height for animating app
var {
  height: deviceHeight
} = Dimensions.get('window');

var EditWorkoutModal = React.createClass({
  getInitialState: function() {
    return {
      offset: new Animated.Value(deviceHeight),
      visibleHeight: Dimensions.get('window').height,
      visibleWidth: Dimensions.get('window').width,
      //workout will be loaded from componentWillMount's
      //editWorkoutActions.resetWorkout call
      workout: null
    };
  },
  componentWillMount: function() {
    this.keyboardWillShowListener = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide);

    //back up original workout, to revert back if user cancels changes
    editWorkoutActions.saveBackupWorkout();
    editWorkoutStore.addChangeListener(this._onChange);

    //reset workout to empty template, so user can start from scratch
    editWorkoutActions.resetWorkout();
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: 0
    }).start();
  },
  componentWillUnmount: function() {
    editWorkoutStore.removeChangeListener(this._onChange);
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  },
  _onChange: function(){
    this.setState({
      workout: editWorkoutStore.getWorkout(),
    });
  },
  handleCancelPress: function(){
    editWorkoutActions.cancelChanges();
    this.closeModal();
  },
  handleDonePress: function(){
    editWorkoutActions.setDefaultOrCustom('custom');
    modalActions.openViewWorkoutModal();
    this.closeModal();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: deviceHeight
    }).start(modalActions.closeEditWorkoutModal);
  },
  keyboardWillShow: function(e) {
    var newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({visibleHeight: newSize});
  },
  keyboardWillHide: function(e) {
    this.setState({visibleHeight: Dimensions.get('window').height});
  },
  scrollToComponent: function(refName, child) {
    var offset;
    if(child === 'instrTextInput') offset = -80;
    else if(child === 'customTextInput') offset = 50;

    setTimeout( () => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        offset, //more offset
        true
      );
    }, 50);
  },
  render: function() {
    var parts = this.state.workout.parts.map((part, index) =>
      /* jshint ignore:start */
      <View style={{marginBottom: 20}} key={index} >
        <Part
          ref={'part' + index}
          part={part}
          partIdx={index}
          scrollToComponent={this.scrollToComponent} />
      </View>
      /* jshint ignore:end */
    );

    //Bottom content inset of ScrollView offsets
    //tab bar from covering scene
    return (
      /* jshint ignore:start */
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={[styles.container, {height: this.state.visibleHeight, width: this.state.visibleWidth}]}>

          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={this.handleCancelPress}>
                <Text style={styles.headerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitleText}>New Workout</Text>
              <TouchableOpacity onPress={this.handleDonePress}>
                <Text style={styles.headerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            ref='scrollView'
            keyboardDismissMode='on-drag'
            contentContainerStyle={styles.contentContainerStyle} >
            <TableView>

              <Section>
                <DateCell
                  date={this.state.workout.date} />
              </Section>

              {parts}

              <Section>
                <CustomCell onPress={editWorkoutActions.addPart}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                      style={{height: 18, width: 18, marginRight: 5}}
                      source={require('image!addButton')} />
                    <Text style={styles.addPartText}>Add Part</Text>
                  </View>
                </CustomCell>
              </Section>

            </TableView>
          </ScrollView>

        </View>
      </Animated.View>
      /* jshint ignore:end */
    );

  }
});

var styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    borderRadius: 3,
    shadowColor: '#9B9B9B',
    shadowOpacity: 8,
  },
  header: {
    flex: .1,
    borderBottomWidth: .5,
    borderBottomColor: 'rgba(155, 155, 155, 0.7)',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: '#4DBA97',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
  },
  headerTitleText: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: 'white'
  },
  headerButtonText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17,
    color: 'white'
  },
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  addPartText: {
    fontFamily: 'Avenir Next',
    color: 'rgba(0,173,148,.7)',
    fontSize: 15,
  },
});

module.exports = EditWorkoutModal;
