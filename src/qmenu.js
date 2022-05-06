import React from 'react';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import {
    Button, FormControl, InputLabel, Input, 
    Stack, IconButton, TextField,
    ToggleButton, ToggleButtonGroup, Tooltip
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';

// TODO: Stackable Timer subpage; StackBaker; with banner for multiple use cases
// TODO: upload scans, convert to question list, and review / edit that before taking the test
// TODO: save questions and answers afterwards to database
// TODO: ability to pause the Stack timer

const NIconButtonRed = styled(IconButton)(({ theme }) => ({
    backgroundColor: "#ffffff",//"#ACACAC",
    "&:hover": {
        backgroundColor: "#DA3E52"
    }
}));

const NIconButtonOrange = styled(IconButton)(({ theme }) => ({
    width: "auto",
    backgroundColor: "#ffffff",
    "&:hover": {
        backgroundColor: "#3FDECC"
    }
}));


function QuestionMenu(props) {
    const navigate = useNavigate()

    function parseMinSec(x) {
        // assume of the form "(int)m (int)s"
        if (/[^0-9]/g.test(x) && !/[ms]/.test(x)) {
            return false
        }

        let y = x.split(" ") 
        if (y.length !== 2) {
            return false
        }

        if (y[0][y[0].length - 1] !== "m" || y[1][y[1].length - 1] !== "s") {
            return false
        }

        let min = parseInt(y[0].slice(0, -1))
        let sec = parseInt(y[1].slice(0, -1))
        
        if (isNaN(min) || (isNaN(sec) && isNaN(min)) || min < 0 || sec < 0) {
            return false
        }

        if (isNaN(sec)) {
            sec = 0
        }

        if (isNaN(min)) {
            min = 0
        }
        return parseFloat(min) + parseFloat(sec) / 60
    }

    function _check(q, t) {
        if (q === "" && t === "") {
            alert("Timer cannot be void")
            return false
        } else if (!parseMinSec(t) && (/m|s/.test(t) || isNaN(parseFloat(t)) || parseFloat(t) < 0)) {
            alert("Invalid timer")
            return false
        } else {
            return true
        }
    }

    // may not persist
    function handleSubmit(e) {
        e.preventDefault()

        if (props.editing) {
            alert("First save everything else")
            return
        }

        var curQ = e.target[0].value
        var curT = e.target[1].value

        if (!_check(curQ, curT)) {
            return
        } else {
            // for some reason here this will rerender
            props.qsetter(curQ)
            props.tsetter((/[ms]/.test(curT)) ? parseMinSec(curT) : parseFloat(curT))

            document.getElementById("questions").value = ""
            document.getElementById("timers").value = ""
        }
    }

    function handleSave() {
        var newQuestions = {}
        var newTimers = {}
        for (const index in props.qs) {
            if (isNaN(parseInt(index))) {
                continue
            } else {
                // update qs index
                var currentQ = document.getElementById("item_" + index).value
                var currentT = document.getElementById("timer_" + index).value

                if (!_check(currentQ, currentT)) {
                    return
                } else {
                    newQuestions[index] = currentQ
                    newTimers[index] = (/[ms]/.test(currentT)) ? parseMinSec(currentT) : parseFloat(currentT)
                }
            }
        }
        props.multiqsetter(newQuestions)
        props.multitsetter(newTimers)
        props.setEditing(false)
        return 
    }

    function displayMinSec(minutes) {
        var mins = Math.floor(minutes)
        var sec = Math.floor((minutes - mins) * 60)
        return mins + "m " + sec + "s"
    }

    function displayQuestions() {
        return Object.keys(props.qs).map((index) => {
            if (isNaN(parseInt(index))) {
                return null
            } else 
            return (
                <div className="item" key={index}>
                    <TextField
                        disabled={!props.editing}
                        label="Question"
                        id={"item_" + index}
                        defaultValue={props.qs[index]} 
                        variant="outlined"
                        style={{
                            margin: "0.5em",
                            width: "40vw"
                        }}
                    />
                    <TextField
                        disabled={!props.editing}
                        label="Time Limit"
                        id={"timer_" + index}
                        defaultValue={(props.editing) ? 
                            props.ts[index]
                            : displayMinSec(props.ts[index])
                        }
                        style={{
                            margin: "0.5em",
                            width: "10vw", 
                            minWidth: "43px",
                        }}
                    />
                    <NIconButtonRed
                        onClick={(e) => {
                            e.preventDefault()
                            props.itempopper(index)
                        }}
                    >
                        <RemoveIcon></RemoveIcon>
                    </NIconButtonRed>
                </div>
            );
        });
    }

    function displayModeSetter() {
        return (
            <ToggleButtonGroup
                value={props.mode}
                onChange={props.modesetter}
                aria-label="test settings"
                size="medium"
                style={{
                    marginTop: "0em"
                }}
            >
                <ToggleButton value="skip" aria-label="skip to next question">
                    <Tooltip title="Skip to next question when timer expires (go over time limit)">
                        <SkipNextIcon />
                    </Tooltip>
                </ToggleButton>
                
                <ToggleButton value="roll" aria-label="roll time over">
                    <Tooltip title="Carry time over (less time next question if you go over time limit)">
                        <MoreTimeIcon />
                    </Tooltip>
                </ToggleButton>

            </ToggleButtonGroup>
        );
    }

    return (
        <div className="Hpage" style={{justifyContent: "flex-start"}}>
            <h1 style={{fontSize: 72, marginBottom: "0.35em"}}>{props.title}</h1>
            <h2 style={{fontSize: 36, marginBottom: "2em", marginTop: "0.2em"}}>Make your test.</h2>
            <form
                onSubmit={handleSubmit}
                className="menu"
            >
                <FormControl style={{margin: '1.5em', marginTop: "-1.5em"}}>
                    <InputLabel htmlFor="questions">Type a question</InputLabel>
                    <Input
                        id="questions"
                        type="text"
                        onChange={ (e) => document.getElementById("questions").value = e.target.value}
                        style={{width: "31vw", minWidth: "30ch"}}
                    >
                    </Input>
                </FormControl>
                <FormControl style={{margin: "1.5em"}}>
                    <InputLabel htmlFor="timers">Set a time limit (ex: 1.2 or 1m 12s)</InputLabel>
                    <Input
                        id="timers"
                        type="text"
                        onChange={ (e) => document.getElementById("timers").value = e.target.value}
                        style={{width: "31vw", minWidth: "30ch"}}
                    >
                    </Input>
                </FormControl>
                <div className="buttons" style={{margin: "1.5em"}}>
                    <Button variant='outlined' type='submit' style={{margin: "10px", color: "#047AFB"}}>
                        Add question
                    </Button>
                    <Button
                        variant='outlined'
                        style={{margin: "10px", color: "#047AFB"}}
                        onClick={() => {
                            if (Object.keys(props.qs).length > 1) {
                                return navigate("/startpage")
                            } else {
                                alert("No questions")
                            }
                        }}
                    >
                        Done!
                    </Button>
                </div>
            </form>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "31vw",
                minWidth: "15ch",
            }}>
                {displayModeSetter()}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    <NIconButtonOrange
                        size="large"
                        onClick={(e) => { e.preventDefault(); props.setEditing(!props.editing) }}
                        /* kind looks weird
                        style={{
                            marginRight: (!props.editing) ? "48px" : 0
                        }} */
                    >
                        <Tooltip title="Edit your test">
                            <EditIcon />
                        </Tooltip>
                    </NIconButtonOrange>
                    { (props.editing) ? 
                        <NIconButtonRed size="large" onClick = {(e) => {
                            e.preventDefault();
                            handleSave()
                        }}>
                            <Tooltip title="Save">
                                <SaveIcon />
                            </Tooltip>
                        </NIconButtonRed>
                        : null
                    }
                </div>
            </div>
            <br></br>
            <Stack>
                {displayQuestions()}
            </Stack>
        </div>
    );
}

export default QuestionMenu;