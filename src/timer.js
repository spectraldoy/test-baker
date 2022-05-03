import "./App.css"
import React, { useState } from "react"
import { useTimer } from 'react-timer-hook';
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

// TODO: pause button in timer

function TimerDisplay(props) {
    const title = "🅱️est 🅱️aker"
    const navigate = useNavigate()
    const n = props.qs.length
    const [i, setI] = useState(0);
    var curAns = ""
    // for some reason this needs to be expiryTimeStamp
    var expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + props.ts[i] * 60);
    const {
        seconds,
        minutes,
        hours,
        restart,
    } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => answerQuestion(document.getElementById("answers").value) });

    function answerQuestion(a) {
        if (i >= n - 1) {
            return navigate("/finaldestination")
        }

        expiryTimestamp = new Date()
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + props.ts[i + 1] * 60);
        setInterval(() => restart(expiryTimestamp, true), 1)

        document.getElementById("answers").value = ""
        props.asetter(a)
        setI(i + 1);
    }

    function handleSubmit(e) {
        e.preventDefault() // this is the one that prevents the rerender
        curAns = e.target[0].value;
        return answerQuestion(curAns);
    }

    function displayQuestion() {
        var question = props.qs[i]

        return (
            <h2 style={{fontSize: 36}}>{i + 1}. {question}</h2>
        );
    }

    return (
        <div className="App">
            <h1 style={{fontSize: 72}}>{title}</h1>
            <h1 style={{fontSize: 160, marginTop: "-1vh", marginBottom: "-1vh"}}>{hours}:{minutes}:{seconds}</h1>
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
                    <Button variant='contained' type='submit' style={{margin: "10px"}}>
                        Submit Answer
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default TimerDisplay;
