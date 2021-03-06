/*
* @Author: vincetam
* @Date:   2016-01-02 17:17:23
* @Last Modified by:   VINCE
* @Last Modified time: 2016-01-11 19:32:37
*/

'use strict';

var React = require('react-native');
var logModalActions = require('../../../actions/logModalActions');

var {
  PickerIOS,
} = React;

var MultiPickerIOS = require('react-native-multipicker');
var { Group, Item } = MultiPickerIOS;

var PickerItemIOS = PickerIOS.Item;
var WEIGHT_CHOICES = ['No Weight',5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450];
var UNIT_CHOICES = ['lb','kg'];

var LogLoadPicker = React.createClass({
  getInitialState: function() {
    return {
      loadVal: this.props.load,
      units: this.props.loadUnit,
    };
  },
  componentWillUpdate: function(){
    //if units are undefined, set to lbs
    if(!this.state.units) {
      this.setState({
        units: 'lb'
      });
    }
  },
  _setLoadVal: function(choiceObj){
    var load = choiceObj.newValue;
    var units;
    if(load === 'No Weight') load = null;

    //state's units property may not yet be updated,
    //so manually set
    if(this.state.units) units = this.state.units;
    else units = 'lbs';

    //Should set part's result val to {val: 100, unit: 'lb'}
    logModalActions.setResultLoad(load, units);

    //Update picker's state
    this.setState({loadVal: load});

  },
  _setLoadUnits: function(choiceObj){
    var unit = choiceObj.newValue;

    //Should set part's result val to {val: 100, unit: 'lb'}
    logModalActions.setResultLoad(this.state.loadVal, unit);

    //Update picker's state
    this.setState({units: unit});
  },
  showChoiceLabels: function(choice){
    //If user selects number from WEIGHT_CHOICES, stringify
    if(typeof choice === 'number') {
      return choice.toString();
    } else {
      return choice;
    }
  },
  getLoadSelectedIndex: function(){
    //MultiPicker's selectedValue does not work, must use selectedIndex
    //returns the associated index val of WEIGHT_CHOICES
    if(this.state.loadVal) {
      return this.state.loadVal/5;
    } else {
      return 0;
    }
  },
  getUnitSelectedIndex: function(){
    //returns the associated index val of units
    if(this.state.units === 'lb') return 0;
    if(this.state.units === 'kg') return 1;
  },
  render: function() {
    var loadValItems = WEIGHT_CHOICES.map((choice, index) =>
      <Item
        value={choice}
        label={this.showChoiceLabels(choice)}
        key={index} />
    );

    var unitItems = UNIT_CHOICES.map((choice, index) =>
      <Item
        value={choice}
        label={choice}
        key={index} />
    );

    return (
      <MultiPickerIOS>
        <Group selectedIndex={this.getLoadSelectedIndex()} onChange={this._setLoadVal}>
          {loadValItems}
        </Group>
        <Group selectedIndex={this.getUnitSelectedIndex()} onChange={this._setLoadUnits}>
          {unitItems}
        </Group>
      </MultiPickerIOS>
    );
  }
});

module.exports = LogLoadPicker;
