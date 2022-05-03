import './App.css';
import React, { useState } from 'react';
import QuestionMenu from './qmenu';
import HomePage from './homepage';
import StartPage from './abouttostart';
import Countdown from './countdown';
import TimerDisplay from './timer';
import FinalDestination from './finaldestination';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [questions, setQuestions] = useState(["There are several names in the great gatsby of the plains of tea in the siisue ware of the haphonde.s If you werw  agreat savant like m you would know what i' talking about. Unfortunately you ren't so you can't know.", "where"])
  const [timers, setTimers] = useState([3, 4])
  const [answers, setAnswers] = useState(["you", "there"])

  console.log("Questions:", questions)
  console.log("timers", timers)
  console.log("answers", answers)

  function handleNewQ(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleNewT(newTimer) {
    setTimers([...timers, newTimer])
  }

  function handleNewA(newAnswer) {
    setAnswers([...answers, newAnswer])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionmenu" element={<QuestionMenu 
          qsetter={handleNewQ}
          tsetter={handleNewT}
        />}/>
        <Route path="/startpage" element={<StartPage />} />
        <Route path="/timercountdown" element={<Countdown />} />
        <Route path="/timerdisplay" element={<TimerDisplay 
          qs={questions}
          ts={timers}
          asetter={handleNewA}
        />} />
        <Route path="/finaldestination" element={<FinalDestination 
          qs={questions}
          as={answers}
        />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
