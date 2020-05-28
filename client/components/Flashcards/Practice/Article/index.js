import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactCardFlip from 'react-card-flip'
import { Button } from 'react-bootstrap'
import { Icon } from 'semantic-ui-react'
import Flashcard from '../Flashcard'

const Article = ({ card, cardNumbering, answerCard }) => {
  const [flipped, setFlipped] = useState(false)
  const [answerChecked, setAnswerChecked] = useState(false)
  const [answerCorrect, setAnswerCorrect] = useState(null)

  const { flashcardArticles } = useSelector(({ metadata }) => metadata)

  const iconRef = useRef()

  useEffect(() => {
    setFlipped(false)
    setAnswerChecked(false)
    setAnswerCorrect(null)
  }, [card])

  const {
    lemma,
    _id: id,
    stage,
    gender,
  } = card

  const flipCard = () => {
    setFlipped(!flipped)
    setAnswerChecked(true)
  }

  // flip card when icon has rendered
  useEffect(() => {
    if (!iconRef.current) return
    if (!flipped) { flipCard() }
  }, [iconRef.current])


  const correctArticles = {
    Fem: 'Die',
    Neut: 'Das',
    Masc: 'Der',
    f: 'La',
    m: 'Le',
    nt: 'Ett',
    ut: 'En',
  }

  const checkAnswer = (answer) => {
    const correct = correctArticles[gender] === answer
    answerCard(answer, correct)
    setAnswerCorrect(correct)
  }

  const cardProps = {
    cardNumbering,
    stage,
    id,
    flipCard,
  }

  const articleButtons = flashcardArticles.map(article => (
    <Button key={`${article}-${id}`} onClick={() => checkAnswer(article)}>{article}</Button>))

  const rightAnswer = `${correctArticles[gender]} ${lemma}`

  const resultIconName = answerCorrect ? 'thumbs up outline' : 'thumbs down outline'

  return (
    <ReactCardFlip isFlipped={flipped}>
      <Flashcard {...cardProps}>
        <div className="flex align-center grow">
          {!answerChecked
            && (
              <div className="flex-column gap-row-2">
                {articleButtons}
              </div>
            )
          }
          <span className="header-2 auto">{lemma}</span>
        </div>
      </Flashcard>
      <Flashcard {...cardProps}>
        <div className="flex-column space-evenly align-center grow">
          <span className="header-2">{rightAnswer}</span>
          {answerCorrect !== null
            && (
              <Icon
                ref={iconRef}
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
                name={resultIconName}
                size="huge"
              />
            )}
        </div>
      </Flashcard>
    </ReactCardFlip>
  )
}

export default Article