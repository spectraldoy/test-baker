import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import "./App.css";

function StartPage(props) {
    return (
        <div className="Hpage" >
            <h1 style={{fontSize: 72, margin: "0.01em"}}>{props.title}</h1>
            <h2 style={{fontSize: 48, }}>Whenever you're ready.</h2>
            <Link
                style={{textDecoration: 'none'}}
                to="/timercountdown"
            >
                <Button variant="outlined" style={{
                    marginBottom: "10vh",
                    minWidth: "30vw",
                    minHeight: "10vh",
                    fontSize: 20,
                }}>Start</Button> 
            </Link>
        </div>
    );
}

export default StartPage;