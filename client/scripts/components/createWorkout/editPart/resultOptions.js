/*
* @Author: vincetam
* @Date:   2015-12-13 19:01:55
* @Last Modified by:   VINCE
* @Last Modified time: 2015-12-15 15:12:45
*/

'use strict';

var React = require('react-native');
var createWorkoutActions = require('../../../actions/createWorkoutActions');

var {
  SegmentedControlIOS,
  TextInput,
  View
} = React;


var ResultOptions = React.createClass({
  setResultType: function(val){
    //If user selects Custom in SegmCtrl, preset to
    //null, as user will specify what custom metric is with
    //showOrHideCustomInput's TextInput.
    if(val === 'Custom') val = null;
    createWorkoutActions.setResultType(val, this.props.partIdx)
  },
  getResultTypeIdx: function(){
    //Changes segmCtrlIdx based on result type
    var idx, resultType = this.props.resultType;

    if(resultType === 'Time') idx = 0;
    else if(resultType === 'Rounds') idx = 1;
    else if(resultType === 'Max Load') idx = 2;
    else idx = 3; //else resultType is a custom one

    return idx;
  },

  render: function(){
    //Need to declare to pass to showOrHideCustomInput
    var resultType = this.props.resultType;
    var setResultType = this.setResultType;

    var showOrHideCustomInput = function(){
      //If resultType is a custom one, show TextInput
      if(resultType !== 'Time' &&
        resultType !== 'Rounds' &&
        resultType !==  'Max Load') {
        return (
          <TextInput
            value={resultType}
            placeholder="Custom Metric..."
            style={{height:38, marginTop: 5}}
            onChangeText={(text) => setResultType(text)} />
        );
      } else {
        return null;
      }
    };

    return (
      /* jshint ignore:start */
      <View style={{marginBottom: 0}}>
        <SegmentedControlIOS
          values={['Time', 'Rounds', 'Max Load', 'Custom']}
          selectedIndex={this.getResultTypeIdx()}
          onValueChange={(val) => setResultType(val)}
          tintColor={'#4DBA97'}/>
        {showOrHideCustomInput()}
      </View>
      /* jshint ignore:end */
    );
  }
});

module.exports = ResultOptions;