import "./App.css"
import React, { useState } from "react"
import useTimer from './useTimer.js';
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

function min(a, b) {
    return (a < b) ? a : b
}

function floor(val) {
    return Math.sign(val) * Math.floor(Math.abs(val))
}

function TimerDisplay(props) {
    const navigate = useNavigate()

    // gotta find the first i
    var is = Object.keys(props.qs).sort().slice(0, -1) // get rid of the "count" at the end
    const n = is.length
    const [i, setI] = useState(0);
    const [curTime, setCurTime] = useState(new Date()) 
    
    var curAns = ""
    // for some reason this needs to be expiryTimeStamp
    let expiryTimestamp = new Date();
    expiryTimestamp.setTime(expiryTimestamp.getTime() + props.ts[is[i]] * 60 * 1000); // min to ms
    const {
        seconds,
        minutes,
        hours,
        //start,
        restart,
    } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => answerQuestion(document.getElementById("answers").value),
    expiryCondition: (props.mode.includes("skip")) ? (x) => (x <= 0) : (x) => false });
    // console.log(seconds)
    function answerQuestion(a) {
        let now_ = new Date()
        var distance = now_.getTime() - curTime.getTime();
        // Time calculations for hours, minutes and seconds
        // https://www.w3schools.com/howto/howto_js_countdown.asp
        var hoursTimed = floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minsTimed = floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var secsTimed = floor((distance % (1000 * 60)) / 1000);

        setCurTime(new Date())
        expiryTimestamp = new Date()
        // TODO: time rolling over
        // want expiryTime - now to be added to 
        // var adderDist = (props.mode === "strict") ? 0 : (expiryTimestamp.getTime() - now_) * 1000

        // here just add time if mode is not strict
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + props.ts[is[min(i + 1, n - 1)]] * 60 )
        // this delay causes display problems
        setTimeout(() => restart(expiryTimestamp, true), 0)

        document.getElementById("answers").value = ""
        props.asetter({
            answer: a,
            hours: hoursTimed,
            minutes: minsTimed,
            seconds: secsTimed
        })
        setI(i + 1);
        
        if (i >= n - 1) {
            return navigate("/finaldestination")
        } 
    }

    function handleSubmit(e) {
        e.preventDefault() // this is the one that prevents the rerender
        curAns = e.target[0].value;
        return answerQuestion(curAns);
    }

    function displayQuestion() {
        var question = props.qs[is[i]]

        return (
            <h2 style={{fontSize: 36, maxWidth: "65vw",}}>{i + 1}. {question}</h2>
        );
    }

    function formatTime(t) {
        if (t >= 10) {
            return t
        }
        else {
            return "0" + t
        }
    }
    // >{(hours === 0) ? null : hours + ":"}{(hours === 0) ? ((minutes === 0 && seconds < 0) ? "-0" : minutes) : formatTime(minutes)}:{formatTime(seconds)}</h1>}</>

    return (
        <div className="App">
            <h1 style={{fontSize: 72}}>{props.title}</h1>
            <h1 style={{
                fontSize: 160,
                marginTop: "-1vh",
                marginBottom: "-1vh",
                color: (hours < 0 || minutes < 0 || seconds < 0) ? "#DA3E52" : "black"
            }}>{(hours === 0) ? null : hours + ":"}{(hours === 0) ? (seconds < 0) ? "-" + Math.abs(minutes) : minutes : formatTime(Math.abs(minutes))}:{formatTime(Math.abs(seconds))}</h1>
            {displayQuestion()}
            <form
                onSubmit={handleSubmit}
                className="menu"
            >
                <FormControl variant="outlined" style={{margin: "0em"}}>
                    <InputLabel htmlFor="answers">Answer</InputLabel>
                    <OutlinedInput
                        id="answers"
                        type="text"
                        label="Answer"
                        onChange={ (e) => document.getElementById("answers").value = e.target.value}
                        style={{width: "31vw", minWidth: "30ch"}}
                    >
                    </OutlinedInput>
                </FormControl>
                <div className="buttons" style={{margin: "1em"}}>
                    <Button variant='outlined' type='submit' style={{margin: "10px", color: "#047AFB"}}>
                        Submit Answer
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default TimerDisplay;
