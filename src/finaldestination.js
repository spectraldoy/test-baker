/* display all questions and answers */
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css"

function FinalDestination(props) {
    const title = "🅱️est 🅱️aker"

    function formatTime(t) {
        if (t < 10) {
            return "0" + t
        } else {
            return t
        }
    }

    var questionsAndAnswers = Object.keys(props.qs).map((idx, indx) => {
        return {
            question: props.qs[Object.keys(props.qs)[indx]],
            answer: props.as[Object.keys(props.as)[indx]].answer,
            hours: props.as[Object.keys(props.as)[indx]].hours,
            mins: props.as[Object.keys(props.as)[indx]].minutes,
            secs: props.as[Object.keys(props.as)[indx]].seconds,
            label: idx
        }
    });

    // get rid of the count property
    questionsAndAnswers = questionsAndAnswers.slice(0, -1)

    function displayTest() {
        return questionsAndAnswers.map((item) => {
            return (
                <h2>
                    <li key={item.label}>
                        {item.question}
                        Time taken: {(item.hours === 0) ? null : item.hours + ":"}{(item.hours === 0) ? item.mins : formatTime(item.mins)}:{formatTime(item.secs)}
                        <p style={{color: "blue"}}>{item.answer}</p>
                        <br></br>
                    </li>
                </h2>
            )
        });
    }

    return (
        <div className="Hpage" style={{justifyContent: "flex-start"}}>
            <h1 style={{fontSize: 72, marginBottom: "0.35em"}}>{title}</h1>
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