import React from 'react';
import { Button, FormControl, InputLabel, Input } from '@mui/material';

function QuestionMenu(props) {
    // may not persist
    var curQ = ""
    var curT = ""

    function handleSubmit(e) {
        e.preventDefault()
        curQ = e.target[0].value
        curT = e.target[1].value

        if (curQ === "") {
            alert("Empty question")
        } else if (curT === "" || isNaN(parseFloat(curT))) {
            alert("Invalid timer for this question")
        } else {
            // for some reason here this will rerender
            props.qsetter(curQ)
            props.tsetter(curT)

            // clear the question and timer
            curQ = ""
            curT = ""
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="qmenu"
        >
            <FormControl>
                <InputLabel htmlFor="questions">Type a question</InputLabel>
                <Input
                    id="questions"
                    type="text"
                    onChange={ (e) => document.getElementById("questions").value = e.target.value}
                    style={{width: "50ch"}}
                >
                </Input>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="timers">How much time do you have for it? (minutes)</InputLabel>
                <Input
                    id="timers"
                    type="text"
                    onChange={ (e) => document.getElementById("timers").value = e.target.value}
                    style={{width: "50ch"}}
                >
                </Input>
            </FormControl>
            <div className="qbuttons">
                <Button variant='contained' type='submit' style={{margin: "10px"}}>
                    Add question
                </Button>
                <Button variant='contained' style={{margin: "10px"}}>
                    Done!
                </Button>
            </div>
        </form>
    );
}

export default QuestionMenu;