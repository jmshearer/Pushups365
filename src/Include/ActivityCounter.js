import React from 'react';
import VerticalProgressBar from './VerticalProgressBar.js';
import { toast, Toaster } from "react-hot-toast";
import ConfettiExplosion from 'react-confetti-explosion';
import { ShareButton, NumButton, ButtonBar } from './ButtonBar.js';

export class ActivityCounter extends React.Component {

    static defaultProps = {
        id: "MyActivity",       //Unique identiifer of this activity
        emoji: "⭐",            //Emoji displayed when sharing
        number: "DayOfYear",    //Emoji displayed when sharing {DayOfYear, DayOfMonth, Hour, #}
        multiplier: "1",        //Multiplier (in this example, target is DayOfYear * 1)
        every: "DayOfYear"      //Reset counter in this interval {DayOfYear, DayOfMonth, Hour, Never}
    }

    lsId = "ac-x";

    constructor(props) {
        super(props);

        //Get local storage scoped to this instance
        this.lsId = "ac-" + props.id.toLowerCase();

        var blockMatch = this.getDayOfYear();
        var target = this.getDayOfYear();

        blockMatch = this.convertBlockToNumber(props.every);

        target = this.convertBlockToNumber(props.number) * props.multiplier;


        var lastBlock = parseInt(localStorage.getItem(this.lsID + "LastBlock")) || 0;
        var numCompleted = parseInt(localStorage.getItem(this.lsID + "PushupCount")) || 0;
        if (lastBlock !== blockMatch) {
            numCompleted = 0;
            localStorage.setItem(this.lsID + "LastBlock", blockMatch);
        }

        this.state = {
            numCompleted: numCompleted,
            target: target
        }

        this.addValue = this.addValue.bind(this);
        this.handleShare = this.handleShare.bind(this);
    }

    setState(newState) {
        super.setState(newState)
        localStorage.setItem(this.lsID + "PushupCount", newState.numCompleted);
    }


    convertBlockToNumber(block) {
        var ret = 0;
        switch (block.toLowerCase()) {
            case "dayofyear":
                ret = this.getDayOfYear();
                break;
            case "dayofmonth":
                ret = (new Date()).getDate();
                break;
            case "month":
                ret = (new Date()).getMonth() + 1;
                break;
            case "hour":
                ret = (new Date()).getHours() + 1;
                break;
            default:
                ret = parseInt(block);
                break;
        }
        return parseInt(ret);
    }

    getDayOfYear() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }

    handleOptions(e) {
        this.setState({
            numCompleted: 0
        })
    }

    handleShare(e) {
        if (this.state.numCompleted < this.state.target) {
            navigator.clipboard.writeText(this.props.emoji + "x" + this.state.numCompleted + "...");
        } else {
            navigator.clipboard.writeText(this.props.emoji + "x" + this.state.numCompleted);
        }
        toast('Results copied to clipboard');
    }

    render() {
        var isCompleted = (this.state.target === this.state.numCompleted);
        var shareMessage = this.props.emoji + "x" + this.state.numCompleted;
        return <div>
            <Toaster position="top-center" />
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

    addValue(event) {
        var newNumCompleted = this.state.numCompleted + parseInt(event.target.value);
        if (newNumCompleted < 0) {
            newNumCompleted = 0;
        }
        if (newNumCompleted > this.state.target) {
            newNumCompleted = this.state.target;
        }
        this.setState({
            numCompleted: newNumCompleted
        })
    }

}