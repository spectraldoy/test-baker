import './App.css';
import React, { useState } from 'react';
import QuestionMenu from './qmenu';
import HomePage from './homepage';
import StartPage from './abouttostart';
import Countdown from './countdown';
import TimerDisplay from './timer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [questions, setQuestions] = useState([])
  const [timers, setTimers] = useState([])

  console.log("Questions:", questions)
  console.log("timers", timers)

  function handleNewQ(newQuestion) {
    setQuestions([...questions, newQuestion])
  }
  function handleNewT(newTimer) {
    setTimers([...timers, newTimer])
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
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
