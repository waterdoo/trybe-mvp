/*
* @Author: vincetam
* @Date:   2015-12-29 15:02:15
* @Last Modified by:   vincetam
* @Last Modified time: 2015-12-29 16:16:21
*/

'use strict';

var React = require('react-native');
var editWorkoutActions = require('../../actions/editWorkoutActions');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} = React;

var ViewPartHeader = React.createClass({
  getInitialState: function(){
    return {
      isLogged: false
    };
  },
  logPart: function(){
    this.setState({
      isLogged: true
    });
  },
  render: function(){
    var part = this.props.part;
    var partIdx = this.props.partIdx;

    var expandOrCollapseArrow = this.props.isCollapsed ?
      <Image source={require('image!expandArrow')} /> :
      <Image source={require('image!collapseArrow')} />;

    var logOrLoggedIcon = this.state.isLogged ?
      <Image source={require('image!loggedIcon')} /> :
      <Image source={require('image!logIcon')} />;

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
          <TouchableOpacity onPress={this.logPart}>
            {logOrLoggedIcon}
          </TouchableOpacity>
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
});

module.exports = ViewPartHeader;
