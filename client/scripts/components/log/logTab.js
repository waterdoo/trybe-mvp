/*
* @Author: vincetam
* @Date:   2016-01-09 17:03:49
* @Last Modified by:   vincetam
* @Last Modified time: 2016-02-12 11:13:07
*/

'use strict';

var React = require('react-native');
var Log = require('./log');
var modalActions = require('../../actions/modalActions');
var logActions = require('../../actions/logActions');
var logStore = require('../../stores/logStore');
var editWorkoutActions = require('../../actions/editWorkoutActions');

var {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Image,
  SegmentedControlIOS
} = React;

var RouteStack = {
  app: {
    name: 'Log',
    component: Log,
  }
};


var LogTab = React.createClass({
  goToScene: function(component, name, workout){
    this.refs.logNav.push({
      component: component,
      name: name,
      workout: workout
    });
  },
  resetRoute: function(route){
    this.refs.logNav.popToTop();
  },
  renderScene: function(route, navigator){
    var Component = route.component;

    return (
      <Component
        goToScene={this.goToScene}
        route={route} />
    );
  },
  render: function() {
    return (
      /* jshint ignore:start */
      <Navigator
        ref="logNav"
        initialRoute={RouteStack.app}
        renderScene={this.renderScene}
        sceneStyle={styles.scene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={NavBarRouteMapper} />
        } />
      /* jshint ignore:end */
    );
  }
});

var NavBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if(route.name === 'Log'){
      //if user is at log page, show SegmentedControl to show or hide calendar
      var toggleCalView = function(val){
        if(logStore.getIsShowingCalendar() === true){
          logActions.setIsShowingCalendar(false);
        } else {
          logActions.setIsShowingCalendar(true);
        }
      };

      return (
        <TouchableOpacity
          style={styles.navBarComponentContainer}
          onPress={ () => toggleCalView()}>
          <Image source={require('image!calendarIcon')} style={{width: 22, height: 22}} />
        </TouchableOpacity>
      );
    } else {
      //Otherwise show back button
      return (
        /* jshint ignore:start */
        <TouchableOpacity
          style={styles.navBarComponentContainer}
          onPress={ () => {
            if(index > 0) {
              navigator.pop();
            }
          }}>
          { index > 0 ?
            <Image
              style={{height: 22, width: 12}}
              source={ require('image!backArrow') } /> : null }
        </TouchableOpacity>
        /* jshint ignore:end */
      );
    }
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      /* jshint ignore:start */
      <TouchableOpacity
        style={styles.navBarComponentContainer}
        onPress={ () => console.log('search pressed')}>
        <Image source={require('image!search')} style={styles.searchIcon}/>
      </TouchableOpacity>
      /* jshint ignore:end */
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      /* jshint ignore:start */
      <View style={styles.navBarComponentContainer}>
        <Text style={styles.navBarTitleText}>{route.name}</Text>
      </View>
      /* jshint ignore:end */
    );
  },
};

var styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 64, //offset nav bar from covering scene
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#4DBA97',
    alignItems: 'center',
  },
  navBarComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  navBarTitleText: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: 'white'
  },
  navBarSideText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 17,
    color: 'white'
  },
  searchIcon:{
    height: 22,
    width: 22,
    marginBottom: 4,
  }
});

module.exports = LogTab;