import "./App.css"
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Countdown() {
    let [count, setCount] = useState(3);

    function counter() {
        if (count === 0) {
            return <Navigate to="/timerdisplay" />
        }

        setTimeout(() => setCount(count - 1), 1000);

        return count;
    }

    return (
        <div className="countdown">
            <h1 id="counter">{counter()}</h1>
        </div>
    );
}

export default Countdown;