import React from 'react';


export class ButtonBar extends React.Component {
  
  constructor(props){    
    super(props);
    this.onExpand = this.onExpand.bind(this);
    this.onButtonBarClick = this.onButtonBarClick.bind(this);
    this.state = {
        isExpanded: false
    }
  }

   render(){  
        return <div className="ButtonBar" onClick={this.onButtonBarClick}>            
                {this.state.isExpanded ? this.props.children : this.renderExpandButton()}                        
            </div>
   }
   

   renderExpandButton(){
        return <button className="SimpleButton Expand" onClick={this.onExpand}>±</button>
   }

   collapseInterval=false;
   onButtonBarClick(){        
        this.resetCollapse();
   }

   onExpand(){    
    this.setState({
        isExpanded: true
    });    
    this.resetCollapse();    
   }

    resetCollapse(){
        var me = this;                
        if(me.collapseInterval){        
            clearTimeout(this.collapseInterval);
            this.collapseInterval=false;            
        }
        me.collapseInterval = setTimeout(function(){
            me.setState({
                isExpanded: false
            });
        },4000);
    }
}

export const NumButton = (props) => {
    var buttonClass = "Minus";
    if(props.value>0){
        buttonClass="Plus";
    }
    return <button className={"SimpleButton " + buttonClass} data-testid={"NumButton" + props.value} value={props.value} onClick={props.onClick}>
            {props.value}            
        </button>;

}

export const ShareButton = (props) => {
    return <button className="SimpleButton Share" data-testid="ShareButton" value={props.value} onClick={props.onClick}>
            {props.value}            
        </button>;

}