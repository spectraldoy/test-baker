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
  const [questions, setQuestions] = useState(["qsdf", "sdf"])
  const [timers, setTimers] = useState([0.1, 0.75])
  const [answers, setAnswers] = useState([])

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
          qsetter={setQuestions}
          tsetter={setTimers}
          asetter={setAnswers}
        />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
