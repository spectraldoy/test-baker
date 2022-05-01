import React, { useState } from 'react';
import { Button } from '@mui/material/Button';


function QuestionMenu() {
    const [questions, setQuestions] = useState([])
    const [timers, setTimers] = useState([])

    return (
        <div className="qmenu">
            <div className="qbuttons">
                <Button>
                    Add question
                </Button>
                <Button>
                    Done!
                </Button>
            </div>
        </div>
    );
}

export default QuestionMenu;