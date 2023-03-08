import React from 'react';

export default class VerticalProgressBar extends React.Component {  
    render(){
      var percent = (this.props.currentValue / this.props.maxValue) * 100;
      
      return <div className="ProgressHolder">
        {this.props.maxValue}
        <div className="Progress" style={{height: percent + "%"}} >{this.props.currentValue}</div>    
      </div>
    }
  }