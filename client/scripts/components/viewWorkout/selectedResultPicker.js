/*
* @Author: vincetam
* @Date:   2016-01-02 16:17:42
* @Last Modified by:   vincetam
* @Last Modified time: 2016-01-02 16:46:59
*/

'use strict';

var React = require('react-native');

var {
  View,
} = React;

var LogTimePicker = require('./logPickers/logTimePicker');
//Rounds
// var LoadPicker = require('./pickers/loadPicker');
//Custom

var SelectedResultPicker = React.createClass({
  //Gist: shows a PickerIOS component to edit reps, load,
  //time, distance, etc. from user selection on SegmentedControlIOS
  render: function() {
    var picker;
    switch (this.props.resultPickerIdx) {
      case 0:
        picker =
          <LogTimePicker />
        break;
      default:
        console.log('Selected Segment Unknown');
    }

    return picker;
  }
});

module.exports = SelectedResultPicker;
