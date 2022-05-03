import React from 'react';
import "./App.css";
import { Link } from 'react-router-dom';
import { Button, FormControl, InputLabel, Input } from '@mui/material';

function QuestionMenu(props) {
    const title = "🅱️est 🅱️aker"

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
            props.tsetter(parseFloat(curT))

            // clear the question and timer
            curQ = ""
            curT = ""

            document.getElementById("questions").value = ""
            document.getElementById("timers").value = ""
        }
    }

    return (
        <div className="Hpage">
            <h1 style={{fontSize: 72}}>{title}</h1>
            <form
                onSubmit={handleSubmit}
                className="menu"
            >
                <FormControl style={{margin: "2.5em"}}>
                    <InputLabel htmlFor="questions">Type a question</InputLabel>
                    <Input
                        id="questions"
                        type="text"
                        onChange={ (e) => document.getElementById("questions").value = e.target.value}
                        style={{width: "50ch"}}
                    >
                    </Input>
                </FormControl>
                <FormControl style={{margin: "2.5em"}}>
                    <InputLabel htmlFor="timers">How much time do you have for it? (minutes)</InputLabel>
                    <Input
                        id="timers"
                        type="text"
                        onChange={ (e) => document.getElementById("timers").value = e.target.value}
                        style={{width: "50ch"}}
                    >
                    </Input>
                </FormControl>
                <div className="buttons" style={{margin: "2.5em"}}>
                    <Button variant='contained' type='submit' style={{margin: "10px"}}>
                        Add question
                    </Button>
                    <Link
                        style={{textDecoration: 'none'}}
                        to="/startpage"
                    >
                        <Button variant='contained' style={{margin: "10px"}}>
                            Done!
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default QuestionMenu;