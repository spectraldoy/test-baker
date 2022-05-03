/* display all questions and answers */
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css"

function FinalDestination(props) {
    const title = "🅱️est 🅱️aker"

    const questionsAndAnswers = props.qs.map((q, idx) => {
        return {
            question: q,
            answer: props.as[idx],
            label: idx
        }
    });

    function displayTest() {
        return questionsAndAnswers.map((item, idx) => {
            return (
                <h2>
                    <li fontSize>
                        {item.question}
                        <p style={{color: "blue"}}>{item.answer}</p>
                        <br></br>
                    </li>
                </h2>
            )
        });
    }

    return (
        <div className="Hpage">
            <h1 style={{fontSize: 72, marginBottom: "0.01em"}}>{title}</h1>
            <h2 style={{fontSize: 36, marginBottom: "0.2em"}}>Here's your test.</h2>
            <ol style={{maxWidth: "40vw"}}>{displayTest()}</ol>
            <Link
                style={{textDecoration: 'none'}}
                to="/"
            >
                <Button
                    variant="contained" 
                    style={{
                        marginBottom: "10vh",
                        marginTop: "6vh",
                        minWidth: "30vw",
                        minHeight: "10vh",
                        fontSize: 20,
                    }}
                    onClick={() => {
                        props.qsetter([])
                        props.tsetter([])
                        props.asetter([])
                    }}
                >
                    Another one!
                </Button> 
            </Link>
        </div>
    );
}

export default FinalDestination;