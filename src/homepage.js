import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import "./App.css";

function HomePage(props) {
    return (
        <div className="Hpage">
            <h1 style={{fontSize: 72}}>{props.title}</h1>
            <Link
                style={{textDecoration: 'none'}}
                to="/questionmenu"
            >
                <Button variant="outlined" style={{
                    marginBottom: "10vh",
                    minWidth: "30vw",
                    minHeight: "10vh",
                    fontSize: 20,
                }}>Get Started</Button> 
            </Link>
        </div>
    );
}

export default HomePage;

