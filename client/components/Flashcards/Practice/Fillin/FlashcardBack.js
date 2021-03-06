import React, { useEffect, useCallback } from 'react'
import FlashcardResult from './FlashcardResult'
import Flashcard from '../Flashcard'

const FlashcardBack = ({
  answerCorrect,
  glosses,
  focusedAndBigScreen,
  flipped,
  setSwipeIndex,
  swipeIndex,
  lemma,
  ...props
}) => {
  const handleEnter = useCallback(event => {
    if (event.keyCode === 13) {
      setSwipeIndex(swipeIndex + 1)
    }
  })

  useEffect(() => {
    if (focusedAndBigScreen && flipped) {
      document.addEventListener('keydown', handleEnter, false)

      return () => {
        document.removeEventListener('keydown', handleEnter, false)
      }
    }
  }, [focusedAndBigScreen, flipped])

  const translations = Array.isArray(glosses)
    ? [...new Set(glosses)].map(item => <li key={item}>{item}</li>)
    : glosses

  return (
    <Flashcard {...props}>
      <span
        style={{
          textAlign: 'center',
          fontWeight: 550,
          fontSize: '20px',
          paddingBottom: '1em',
          paddingTop: '1em',
        }}
      >
        {lemma}
      </span>
      <div className="flashcard-text-container">
        <div className="flashcard-translations">
          <ul>{translations}</ul>
        </div>
      </div>
      <div className="flashcard-input-and-result-container">
        <FlashcardResult answerCorrect={answerCorrect} />
      </div>
    </Flashcard>
  )
}
export default FlashcardBack
