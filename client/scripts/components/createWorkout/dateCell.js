/*
* @Author: vincetam
* @Date:   2015-10-29 15:00:08
* @Last Modified by:   vincetam
* @Last Modified time: 2015-10-29 15:01:59
*/

'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Image
} = React;

import {CustomCell} from 'react-native-tableview-simple';

var DateCell = React.createClass({
  render: function(){
    return (
      /* jshint ignore:start */
      <CustomCell onPress={() => {console.log('Date')}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16, color: '#9B9B9B', fontFamily: 'Avenir Next'}}>Date</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontFamily: 'Avenir Next'}}>Today</Text>
            <Image
              style={{height: 13, width: 8, marginTop: 4, marginLeft: 15}}
              source={require('image!disclosureIndicator')} />
          </View>
        </View>
      </CustomCell>
      /* jshint ignore:start */
    );
  }
});

module.exports = DateCell;