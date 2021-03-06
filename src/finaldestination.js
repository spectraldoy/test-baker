/* display all questions and answers */
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css"
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

// TODO: offer consulting services page at end of the app
// TODO: server and test persistence

  
function floor(val) {
    return Math.sign(val) * Math.floor(Math.abs(val))
}
  

function FinalDestination(props) {
    function formatTime(t) {
        if (t <= -10 || t >= 10) {
            return t
        }
        else if (t < 10 && t >= 0) {
            return "0" + t
        } else {
            return Math.abs(t)
        }
    }

    function displayLimit(time) {
        // time is in minutes
        var hours = floor(time / 60)
        var minutes = floor(time - 60 * hours)
        var seconds = floor((time - (60 * hours + minutes)) * 60)

        return <>{(hours === 0) ? null : hours + ":"}{(hours === 0) ? minutes : formatTime(minutes)}:{formatTime(seconds)}</>
    }

    var questionsAndAnswers = Object.keys(props.qs).map((idx, indx) => {
        return {
            question: props.qs[Object.keys(props.qs)[indx]],
            timer: props.ts[Object.keys(props.qs)[indx]],
            answer: props.as[Object.keys(props.as)[indx]].answer,
            hours: props.as[Object.keys(props.as)[indx]].hours,
            mins: props.as[Object.keys(props.as)[indx]].minutes,
            secs: props.as[Object.keys(props.as)[indx]].seconds,
            label: idx
        }
    });

    // get rid of the count property
    questionsAndAnswers = questionsAndAnswers.slice(0, -1)

    function renderQuestion(question) {
        if (question[0] === '$' && question[question.length - 1] === '$') {
            return <TeX math={question.slice(1, -1)} block/>
        } else {
            return question
        }
    }

    function displayTest() {
        return questionsAndAnswers.map((item) => {
            return (
                <h2>
                    <li key={item.label}>
                        {renderQuestion(item.question)}
                        <p style={{color: "#DA3E52"}}>Time taken: {(item.hours === 0) ? null : item.hours + ":"}{(item.hours === 0) ? item.mins : formatTime(item.mins)}:{formatTime(item.secs)} / {displayLimit(item.timer)}</p>
                        <p style={{color: "#047AFB"}}>{item.answer}</p>
                        <br></br>
                    </li>
                </h2>
            )
        });
    }

    return (
        <div className="Hpage" style={{justifyContent: "flex-start"}}>
            <h1 style={{fontSize: 72, marginBottom: "0.35em"}}>{props.title}</h1>
            <h2 style={{fontSize: 36, marginBottom: "0.2em"}}>Here's your test:</h2>
            <ol style={{maxWidth: "40vw"}}>{displayTest()}</ol>
            <Link
                style={{textDecoration: 'none'}}
                to="/"
            >
                <Button
                    variant="outlined" 
                    style={{
                        marginBottom: "10vh",
                        marginTop: "1vh",
                        minWidth: "20vw",
                        minHeight: "7vh",
                        fontSize: 18,
                        color: "#047AFB"
                    }}
                    onClick={() => {
                        props.qsetter({count: 0})
                        props.tsetter({count: 0})
                        props.asetter({count: 0})
                    }}
                >
                    Another one!
                </Button> 
            </Link>
        </div>
    );
}

export default FinalDestination;