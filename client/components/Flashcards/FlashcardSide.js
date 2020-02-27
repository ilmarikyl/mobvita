import React from 'react'
import { Icon } from 'semantic-ui-react'
import { useIntl } from 'react-intl'
import FlashcardInput from './FlashcardInput'
import FlashcardResult from './FlashcardResult'

const FlashcardSide = ({ answerChecked, answerCorrect, checkAnswer, flipCard, cardIndex, stage, children }) => {
  const intl = useIntl()

  const backgroundColor = [
    'rgb(255, 99, 71)',
    'rgb(255, 165, 0)',
    'rgb(255, 215, 0)',
    'yellowgreen',
    'limegreen',
  ]

  return (
    <div className="flashcard" style={{ backgroundColor: backgroundColor[stage] }}>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', fontWeight: '550' }}>{cardIndex}</div>
      <div className="flashcard-text-container">
        {children}
      </div>
      <div className="flashcard-input-and-result-container">
        <FlashcardInput
          answerChecked={answerChecked}
          checkAnswer={checkAnswer}
        />
        <FlashcardResult answerCorrect={answerCorrect} />
      </div>
      <div className="flashcard-flip">
        <button
          variant="light"
          type="button"
          onClick={() => flipCard()}
        >
          {`${intl.formatMessage({ id: 'Flip' })}   `}
          <Icon name="arrow right" />
        </button>
      </div>
    </div>
  )
}

export default FlashcardSide
