import React from 'react';

export default class VerticalProgressBar extends React.Component {  
    render(){
      var percent = (this.props.currentValue / this.props.maxValue) * 100;
      
      return <div className="ProgressHolder">
        <span data-testid="targetVerticalProgressBarValue">{this.props.maxValue}</span>
        <div className="Progress" style={{height: percent + "%"}} data-testid="currentVerticalProgressBarValue" >{this.props.currentValue}</div>    
      </div>
    }
  }