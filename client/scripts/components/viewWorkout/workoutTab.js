'use strict';

var React = require('react-native');
var modalActions = require('../../actions/modalActions');

//Load components
var WorkoutChoice = require('./workoutChoice');

var {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Image
} = React;

var RouteStack = {
  app: {
    name: 'Today\'s Workout',
    component: WorkoutChoice,
  }
};


var WorkoutTab = React.createClass({
  goToScene: function(component, name){
    this.refs.workoutNav.push({
      component: component,
      name: name
    });
  },
  resetRoute: function(route){
    this.refs.workoutNav.popToTop();
  },
  renderScene: function(route, navigator){
    var Component = route.component;

    return (
      <Component
        goToScene={this.goToScene} />
    );
  },
  render: function() {
    return (
      /* jshint ignore:start */
      <Navigator
        ref="workoutNav"
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
  },

  RightButton: function(route, navigator, index, navState) {
    //Show right button based on user's view
    switch (route.name) {
      //If viewing today's workout, render create workout button
      case 'Today\'s Workout':
        var handleRightPress = function(){
          modalActions.openEditWorkoutModal();
        };
        return (
          <TouchableOpacity
            onPress={() => handleRightPress()}
            style={styles.navBarComponentContainer} >
            <Image source={require('image!createIcon')} />
          </TouchableOpacity>
        );
        break;
      default:
        return null;
    }
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
    backgroundColor: 'rgba(77,186,151,.8)',
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
  }
});

module.exports = WorkoutTab;
