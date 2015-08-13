'use strict';

var React = require('react-native');

//Load components
var Feed = require('./client/scripts/components/feed/feed');
var feedStore = require('./client/scripts/stores/feedStore');
var DoWorkout = require('./client/scripts/components/doWorkout/doWorkout');
var doWorkoutStore = require('./client/scripts/stores/doWorkoutStore');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View,
} = React;


var Trybe = React.createClass({
  getInitialState: function(){
    return {
      selectedTab: 'home'
    };
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title='Profile'
          icon={ require('image!profile') }
          selected={ this.state.selectedTab === 'profile' }>
          <View style={ styles.pageView }>
            <Text>Profile</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Home'
          icon={ require('image!home') }
          selected={ this.state.selectedTab === 'home' }>
          <View style={ styles.pageView }>
            <Feed store={ feedStore } />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Workout'
          icon={ require('image!workout') }
          selected={ this.state.selectedTab === 'doWorkout' }>
          <View style={ styles.pageView }>
            <DoWorkout store={ doWorkoutStore } />
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pageView: {
    backgroundColor: '#fff',
    flex: 1
  }
});

AppRegistry.registerComponent('Trybe', () => Trybe);
