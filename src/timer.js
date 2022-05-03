import "./App.css"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

// TODO: input box and save answers in the App to display afterwards
// TODO: take another test button from the show answers and questions display at the end of the test

function TimerDisplay(props) {
    const title = "🅱️est 🅱️aker"
    const navigate = useNavigate()
    const n = props.qs.length
    const [i, setI] = useState(0); 
    var curAns = ""

    function answerQuestion(a) {
        setI(i + 1); 
        
        document.getElementById("answers").value = ""
        props.asetter(a)

        if (i >= n) {
            return navigate("/finaldestination")
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

        return <></>
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
            {displayTimer()}
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
                <div className="buttons" style={{margin: "0em"}}>
                    <Button variant='contained' type='submit' style={{margin: "10px"}}>
                        Submit Answer
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default TimerDisplay;
