/*
* @Author: vincetam
* @Date:   2015-12-18 15:03:10
* @Last Modified by:   VINCE
* @Last Modified time: 2016-01-12 13:08:59
*/

'use strict';

var React = require('react-native');
var editWorkoutStore = require('../../../stores/editWorkoutStore');
var editWorkoutActions = require('../../../actions/editWorkoutActions');
var modalActions = require('../../../actions/modalActions');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  DatePickerIOS
} = React;

//Gets device height for animating app
var {
  height: deviceHeight
} = Dimensions.get('window');

var EditDateModal = React.createClass({
  getInitialState: function() {
    return {
      date: editWorkoutStore.getDate(),
      offset: new Animated.Value(deviceHeight),
    };
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: 0
    }).start();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: deviceHeight
    }).start(modalActions.closeDateModal);
  },
  onDateChange: function(date){
    this.setState({date: date});
  },
  saveDate: function(){
    editWorkoutActions.saveDate(this.state.date);
    this.closeModal();
  },
  render: function() {

    return (
      <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={this.closeModal}>
                <Text style={styles.headerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitleText}>Workout Date</Text>
              <TouchableOpacity onPress={this.saveDate}>
                <Text style={styles.headerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContainer}>
              <DatePickerIOS
                date={this.state.date}
                onDateChange={this.onDateChange}
                mode='datetime'
                minimumDate={new Date(2015,0,1)} />
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
    paddingBottom: 50,
    backgroundColor: 'rgba(155, 155, 155, 0.4)',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: 280,
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
    height: 240,
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  bodyContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  }
});

module.exports = EditDateModal;
