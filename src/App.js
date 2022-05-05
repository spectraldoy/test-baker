import './App.css';
import React, { useState } from 'react';
import QuestionMenu from './qmenu';
import HomePage from './homepage';
import StartPage from './abouttostart';
import Countdown from './countdown';
import TimerDisplay from './timer';
import FinalDestination from './finaldestination';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

function App() {
  const title = "Test \u{1F171}aker"
  const [questions, setQuestions] = useState({count: 0})
  const [timers, setTimers] = useState({count: 0})
  const [answers, setAnswers] = useState({count: 0})

  // strict mode: timer skips once it expires, time doesn't roll over
  // mercy mode: timer goes negative, time rolls over
  const [mode, setMode] = useState("strict")

  console.log("Questions:", questions)
  console.log("timers", timers)
  console.log("answers", answers)

  function handleNewQ(newQuestion) {
    setQuestions({...questions, [questions.count]: newQuestion, count: questions.count + 1})
  }

  function handleNewT(newTimer) {
    setTimers({...timers, [timers.count]: newTimer, count: timers.count + 1})
  }

  function handleNewA(newAnswer) {
    setAnswers({...answers, [answers.count]: newAnswer, count: answers.count + 1})
  }

  function deleteQ(idx) {
    var {[idx]: _, ...rest} = questions
    setQuestions(rest)
  }

  function deleteT(idx) {
    var {[idx]: _, ...rest} = timers
    setTimers(rest)
  }

  function clearQuestions(newQuestions) {
    setQuestions(newQuestions)
  }

  function clearTimers(newTimers) {
    setTimers(newTimers)
  }
  
  function clearAnswers(newAnswers) {
    setAnswers(newAnswers)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage title={title}/>} />
        <Route path="/questionmenu" element={<QuestionMenu 
          qsetter={handleNewQ}
          tsetter={handleNewT}
          qs={questions}
          ts={timers}
          qpopper={deleteQ}
          tpopper={deleteT}
          title={title}
          modesetter={setMode}
        />}/>
        <Route path="/startpage" element={<StartPage title={title}/>} />
        <Route path="/timercountdown" element={<Countdown />} />
        <Route path="/timerdisplay" element={<TimerDisplay 
          qs={questions}
          ts={timers}
          asetter={handleNewA}
          title={title}
          mode={mode}
        />} />
        <Route path="/finaldestination" element={<FinalDestination 
          qs={questions}
          as={answers}
          ts={timers}
          qsetter={clearQuestions}
          tsetter={clearTimers}
          asetter={clearAnswers}
          title={title}
        />}/>
        <Route path="*" element={<Navigate to="/"></Navigate>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
