import "./App.css"
import React from "react"

// TODO: input box and save answers in the App to display afterwards
// TODO: take another test button from the show answers and questions display at the end of the test

function TimerDisplay(props) {
    const title = "🅱️est 🅱️aker"
    return (
        <div className="Hpage">
            <h1 style={{fontSize: 72}}>{title}</h1>
            <p>Hlo {props.qs} {props.ts}</p>
        </div>
    );
}

export default TimerDisplay;
