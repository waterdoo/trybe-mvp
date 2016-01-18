/*
* @Author: vincetam
* @Date:   2016-01-16 14:31:53
* @Last Modified by:   vincetam
* @Last Modified time: 2016-01-18 11:40:02
*/

'use strict';

var React = require('react-native');

var {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image
} = React;

var InstructionsView = require('./_instructionsView');

var PartSwiperPage = React.createClass({
  render: function(){
    return (
      /* jshint ignore:start */
      <View>
        <View style={styles.partWheel}>
          <Text style={styles.partName}>{this.props.part.name.toUpperCase()}</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle} >
          <InstructionsView
            instructions={this.props.part.instructions}
            partIdx={this.props.partIdx} />
        </ScrollView>

      </View>
      /* jshint ignore:start */
    );
  }
});

var styles = StyleSheet.create({
  partWheel: {
    height: 60,
    backgroundColor: 'rgba(77,186,151,.6)',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  partName: {
    fontFamily: 'Avenir Next',
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
});

module.exports = PartSwiperPage;