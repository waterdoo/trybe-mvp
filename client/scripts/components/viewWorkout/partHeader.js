/*
* @Author: vincetam
* @Date:   2015-12-29 15:02:15
* @Last Modified by:   VINCE
* @Last Modified time: 2016-01-07 21:16:35
*/

'use strict';

var React = require('react-native');
var editWorkoutActions = require('../../actions/editWorkoutActions');
var viewWorkoutActions = require('../../actions/viewWorkoutActions');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} = React;

var ViewPartHeader = React.createClass({
  logPart: function(){
    //set targetPartIdx to notify editWorkoutStore which part
    //is being modified
    editWorkoutActions.setTargetPartIdx(this.props.partIdx);
    this.props.openLogModal();
  },
  render: function(){
    var part = this.props.part;
    var partIdx = this.props.partIdx;

    var expandOrCollapseArrow = this.props.isExpanded ?
      null :
      <Image source={require('image!expandArrow')} />
    ;

    var logOrLoggedIcon = this.props.partIsLogged ?
      <TouchableOpacity onPress={this.logPart}>
        <Image
          source={require('image!loggedIcon')}
          style={styles.loggedIcon} />
      </TouchableOpacity>
      :
      <TouchableOpacity onPress={this.logPart}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('image!logIcon')}
            style={styles.logIcon} />
          <Text style={styles.logText}>Log</Text>
        </View>
      </TouchableOpacity>
    ;

    return (
      /* jshint ignore:start */
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.headerText}>{part.name ? part.name : 'Part ' + (partIdx + 1)}</Text>
        </View>
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={() => this.props.toggleCollapse()}>
            {expandOrCollapseArrow}
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          {logOrLoggedIcon}
        </View>
      </View>
      /* jshint ignore:end */
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: .4,
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: .2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: .4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  headerText: {
    fontFamily: 'Avenir Next',
    color: '#4A4A4A',
    fontSize: 16
  },
  logIcon: {
    height: 20,
    width: 20
  },
  logText: {
    fontFamily: 'Avenir Next',
    color: '#4DBA97',
    marginTop: 5,
    marginLeft: 5
  },
  loggedIcon: {
    height: 24,
    width: 24
  }
});

module.exports = ViewPartHeader;