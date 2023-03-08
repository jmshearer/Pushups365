import React from 'react';
import './App.scss';
import VerticalProgressBar from  './Include/VerticalProgressBar.js';
import {toast, Toaster} from "react-hot-toast";
import ConfettiExplosion from 'react-confetti-explosion';
import {ShareButton, NumButton, ButtonBar} from './Include/ButtonBar.js';

/*<button className="SimpleButton" onClick={this.handleShare}>💪</button>*/


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
    var isCompleted = (this.state.target === this.state.numCompleted);
    var shareMessage = "💪x" + this.state.numCompleted;
    return <div>                
        <Toaster position="top-center"/>
        <ButtonBar>
          <NumButton value="-10" onClick={this.addValue} />
          <NumButton value="-1" onClick={this.addValue} />
          <NumButton value="1" onClick={this.addValue} />
          <NumButton value="10" onClick={this.addValue} />                              
        </ButtonBar>        
        <VerticalProgressBar maxValue={this.state.target} currentValue={this.state.numCompleted}>          
        </VerticalProgressBar>                                
        <center>          
          {isCompleted &&
            <div className="CompletedBadge">              
              <ConfettiExplosion />
              <ShareButton onClick={this.handleShare} value={shareMessage} />              
            </div>}        
        </center>
        
      </div>        
  }

  addValue(event){    
    var newNumCompleted =this.state.numCompleted+parseInt(event.target.value);
    if(newNumCompleted<0){
      newNumCompleted=0;
    }
    if(newNumCompleted>this.state.target){
      newNumCompleted=this.state.target;
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
