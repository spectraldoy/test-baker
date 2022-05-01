import './App.css';
//import QuestionMenu from './qmenu';
import React, { useState } from 'react';
import QuestionMenu from './qmenu';

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
    QuestionMenu({
      qsetter: handleNewQ,
      tsetter: handleNewT
    })
  )

}

export default App;
