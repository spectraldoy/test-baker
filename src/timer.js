import "./App.css"
import React, { useEffect, useState } from "react"
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
    var curDate = new Date().getTime()
    var newDate = new Date(curDate + props.ts[i] * 1000 * 60)
    var distance = newDate - curDate;

    const [hours, setH] = useState(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    const [minutes, setMin] = useState(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
    const [seconds, setSec] = useState(Math.floor((distance % (1000 * 60)) / 1000))

    function answerQuestion(a) {
        setI(i + 1);
        curDate = new Date().getTime()
        newDate = new Date(curDate + props.ts[i] * 1000 * 60)

        document.getElementById("answers").value = ""
        props.asetter(a)

        if (i >= n) {
            //return navigate("/finaldestination")
        }
    }

    function handleSubmit(e) {
        e.preventDefault() // this is the one that prevents the rerender
        curAns = e.target[0].value;
        return answerQuestion(curAns);
    }

    function displayTimer() {
        var timeLimit = props.ts[i] * 1000 * 60
        setTimeout(() => answerQuestion(document.getElementById("answers").value), timeLimit);
       
        //return <h1 style={{fontSize: 72}}>Time Left: {hours}:{minutes}:{seconds}</h1>
        return <></>
    }

    useEffect( () => {
        let interval = null;
        interval = setInterval(function() {
            var now = new Date().getTime()
            var distance = newDate - now;
            // https://www.w3schools.com/howto/howto_js_countdown.asp
            setH(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMin(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
            setSec(Math.floor((distance % (1000 * 60)) / 1000))

            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(interval)
            }
            //document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
        }, 1000)
    });

    function displayQuestion() {
        var question = props.qs[i]

        return (
            <h2 style={{fontSize: 36}}>{i + 1}. {question}</h2>
        );
    }

    return (
        <div className="App">
            <h1 style={{fontSize: 72}}>{title}</h1>
            {displayTimer()}
            <h1 id="timer" style={{fontSize: 72}}>Time Left: {hours}:{minutes}:{seconds}</h1>
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
