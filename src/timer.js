import "./App.css"
import React, { useState } from "react"
import { useTimer } from 'react-timer-hook';
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

// TODO: Time taken after exam done

function min(a, b) {
    return (a < b) ? a : b
}

function TimerDisplay(props) {
    const title = "🅱️est 🅱️aker"
    const navigate = useNavigate()

    // gotta find the first i
    var is = Object.keys(props.qs).sort().slice(0, -1) // get rid of the "count" at the end
    const n = is.length
    const [i, setI] = useState(0);
    var curAns = ""
    // for some reason this needs to be expiryTimeStamp
    let now_ = new Date().getTime()
    let curTime = new Date()
    let expiryTimestamp = new Date();
    expiryTimestamp.setTime(expiryTimestamp.getTime() + props.ts[is[i]] * 60 * 1000); // min to ms
    const {
        seconds,
        minutes,
        hours,
        //start,
        restart,
    } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => answerQuestion(document.getElementById("answers").value) });

    function answerQuestion(a) {
        now_ = new Date().getTime()
        curTime = new Date()
        curTime.setTime(expiryTimestamp.getTime() - props.ts[is[i]] * 60 * 1000)
        var distance = now_ - curTime.getTime();
        console.log(curTime.getTime(), now_, distance)
        // Time calculations for hours, minutes and seconds
        // https://www.w3schools.com/howto/howto_js_countdown.asp
        var hoursTimed = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minsTimed = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var secsTimed = Math.floor((distance % (1000 * 60)) / 1000);

        expiryTimestamp = new Date()
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + props.ts[is[min(i + 1, n - 1)]] * 60);
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
        if (t < 10) {
            return "0" + t
        } else {
            return t
        }
    }

    return (
        <div className="App">
            <h1 style={{fontSize: 72, maxWidth: "40vw"}}>{title}</h1>
            <h1 style={{
                fontSize: 160,
                marginTop: "-1vh",
                marginBottom: "-1vh",
            }}>{(hours === 0) ? null : hours + ":"}{(hours === 0) ? minutes : formatTime(minutes)}:{formatTime(seconds)}</h1>
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
                        style={{width: "50ch"}}
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
