/*
* @Author: VINCE
* @Date:   2015-09-26 12:46:46
* @Last Modified by:   vincetam
* @Last Modified time: 2016-01-18 17:53:08
*/

'use strict';

var React = require('react-native');

var renderResultsTime = require('./renderResultsTime');

var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var ViewResults = React.createClass({
  render: function(){
    var result = this.props.result;
    var resultView, icon;

    //only render if result is input from user
    if(result.val){
      switch (result.type) {
        case 'Time':
          icon = <Image style={[styles.metricIcon, {marginTop: 2}]} source={require('image!timeIcon')}/> ;
          var time = renderResultsTime(result.val)
          resultView = <Text style={styles.resultText}>{time}</Text>;
          break;
        case 'Rounds':
          icon = <Image style={[styles.metricIcon, {marginTop: 2}]} source={require('image!rounds')}/> ;
          var rounds = result.val.toString() + ' Rounds'
          resultView = <Text style={styles.resultText}>{rounds}</Text>;
          break;
        case 'Max Load':
          icon = <Image style={[styles.metricIcon, {marginBottom: 8}]} source={require('image!weightIcon')}/> ;
          var maxLoad = result.val.val.toString() + ' ' + result.val.units;
          resultView = <Text style={styles.resultText}>{maxLoad}</Text>;
          break;
        case 'Custom':
          resultView = <Text style={styles.resultText}>{result.val}</Text>;
          break;
        //If none of above, is specified custom type
        default:
          resultView =
            <View>
              <Text style={styles.resultText}>{result.type}</Text>
              <Text style={styles.resultText}>{result.val}</Text>
            </View>
      }
    }

    return (
      /* jshint ignore:start */
      <View style={styles.resultContainer}>
        {icon}
        {resultView}
      </View>
      /* jshint ignore:end */
    );
  }
});

var styles = StyleSheet.create({
  resultContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
  },
  metricIcon: {
    height: 18,
    width: 18,
    marginRight: 5,
  },
  resultText: {
    textAlign: 'right',
    fontFamily: 'Avenir Next',
    fontStyle: 'italic',
    color: 'grey',
    fontSize: 17,
    fontWeight: '500',
  }
});

module.exports = ViewResults;