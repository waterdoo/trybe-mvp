/*
* @Author: VINCE
* @Date:   2015-09-25 11:45:27
* @Last Modified by:   vincetam
* @Last Modified time: 2016-01-19 10:18:13
*/

'use strict';

var React = require('react-native');
var logStore = require('../../stores/logStore');
var logActions = require('../../actions/logActions');

//Load components
var ProfileCard = require('./profileCard');
var LogCard = require('./logCard');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} = React;

var Log = React.createClass({
  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  },
  componentDidMount: function(){
    logStore.addChangeListener(this._onChange);
    logActions.getWorkouts();
  },
  componentWillUnmount: function(){
    logStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    var workouts = logStore.getWorkouts();

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(workouts)
    });
  },

  renderHeader: function(){
    return (
      <ProfileCard />
    );
  },

  renderRow: function(workout){
    return (
      /* jshint ignore:start */
      <View style={styles.logCardContainer}>
        <LogCard
          workout={workout} />
      </View>
      /* jshint ignore:end */
    );
  },
  render: function(){
    /* jshint ignore:start */
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader} />
      </View>
      );
    /* jshint ignore:end */
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(141, 134, 126, .2)',
  },
  logCardContainer: {
    marginBottom: 10
  }
});

module.exports = Log;
