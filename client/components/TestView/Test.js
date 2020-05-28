import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTimer } from 'react-compound-timer'
import { Icon } from 'semantic-ui-react'
import { sendAnswer, finishTest } from 'Utilities/redux/testReducer'
import { learningLanguageSelector } from 'Utilities/common'
import MultipleChoice from './MultipleChoice'

const Test = () => {
  const { controls: timer } = useTimer({
    initialTime: 15000,
    direction: 'backward',
    startImmediately: false,
    timeToUpdate: 100,
  })

  const [willStop, setWillStop] = useState(false)
  const [willPause, setWillPause] = useState(false)
  const [paused, setPaused] = useState(false)
  const { currentQuestion, sessionId, questions, currentIndex, answerPending } = useSelector(({ tests }) => tests)
  const learningLanguage = useSelector(learningLanguageSelector)

  const dispatch = useDispatch()

  const checkAnswer = (answer) => {
    timer.stop()
    timer.reset()

    const pauseTimeStamp = willPause ? new Date() : null

    dispatch(sendAnswer(
      learningLanguage,
      sessionId,
      {
        type: currentQuestion.type,
        question_id: currentQuestion.question_id,
        answer,
      },
      pauseTimeStamp,
    ))
  }

  useEffect(() => {
    if (!sessionId) return
    if (!currentQuestion) {
      timer.stop()
      dispatch(finishTest(learningLanguage, sessionId))
    } else if (willStop) {
      timer.stop()
      dispatch(finishTest(learningLanguage, sessionId))
    } else if (willPause) {
      setPaused(true)
      setWillPause(false)
    } else {
      timer.setTime(currentQuestion.time * 1000)
      setTimeout(() => timer.start(), 300)
    }

    timer.setCheckpoints([
      {
        time: 0,
        callback: () => {
          checkAnswer('')
        },
      },
    ])
  }, [currentQuestion])

  const pauseTimer = () => {
    setWillPause(true)
  }

  const resumeTimer = () => {
    setPaused(false)
    setTimeout(() => timer.start(), 300)
  }

  const stop = () => {
    setWillStop(true)
  }

  return (
    <div className="component-container test-container">
      <div>{(Math.round(timer.getTime() / 1000))}</div>
      <Icon
        color={willPause ? 'grey' : 'black'}
        name={paused ? 'play' : 'pause'}
        onClick={paused ? resumeTimer : pauseTimer}
      />
      <Icon
        color={willStop ? 'grey' : 'black'}
        name="stop"
        onClick={stop}
      />
      {willPause && !willStop && <span>timer will pause after this exercise</span>}
      {willStop && <span>ending test after this exercise</span>}
      {currentQuestion && !paused && (
        <div>
          <div>{currentIndex + 1} / {questions.length}</div>
          <MultipleChoice
            exercise={currentQuestion}
            onAnswer={checkAnswer}
            answerPending={answerPending}
          />
        </div>
      )}

      {paused && (
        <div>Timer paused, questions are hidden until timer starts again</div>
      )}
    </div>
  )
}

export default Test