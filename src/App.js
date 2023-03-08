import React from 'react';
import './App.css';
import VerticalProgressBar from  './Include/VerticalProgressBar.js';
import {toast, Toaster} from "react-hot-toast";


class PushupTracker extends React.Component {
  
  constructor(props){    
    super(props);

    var lastTarget = parseInt(localStorage.getItem("LastTarget")) || 0;
    var numCompleted = parseInt(localStorage.getItem("PushupCount")) || 0;
    if(lastTarget!==this.getDayOfYear()){
      numCompleted=0;
      localStorage.setItem("LastTarget",this.getDayOfYear());
    }

    this.state = {
      numCompleted: numCompleted,
      target: this.getDayOfYear()
    }    

    this.addValue = this.addValue.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  setState(newState){    
    super.setState(newState)    
    localStorage.setItem("PushupCount",newState.numCompleted);
  }

  getDayOfYear(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }

  handleOptions(e){    
    this.setState({
      numCompleted: 0
    })    
  }

  handleShare(e){
    if(this.state.numCompleted<this.state.target){
      navigator.clipboard.writeText("💪x" + this.state.numCompleted + "...");
    } else {
      navigator.clipboard.writeText("💪x" + this.state.numCompleted);
    }
    toast('Results copied to clipboard');
  }

  render() {    
    return <div>                
        <Toaster position="top-center"/>
        <div className="ButtonBar">
          <button className="SimpleButton" onClick={this.addValue}>-10</button>
          <button className="SimpleButton" onClick={this.addValue}>-1</button>
          <button className="SimpleButton" onClick={this.addValue}>1</button>
          <button className="SimpleButton" onClick={this.addValue}>10</button>          
          <button className="SimpleButton" onClick={this.handleShare}>Share</button>
        </div>
        <VerticalProgressBar maxValue={this.state.target} currentValue={this.state.numCompleted}></VerticalProgressBar>                
      </div>        
  }

  addValue(event){    
    var newNumCompleted =this.state.numCompleted+parseInt(event.target.innerText);
    if(newNumCompleted<0){
      newNumCompleted=0;
    }
    this.setState({
      numCompleted: newNumCompleted
    })
  }
  
}

function App() {
  return (    
    <PushupTracker />    
  );
}

export default App;
