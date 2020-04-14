import React, { createRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { getTextWidth } from 'Utilities/common'
import { setFocusedWord } from 'Utilities/redux/practiceReducer'


const ExerciseHearing = ({ word, handleClick, handleChange }) => {
  const [className, setClassname] = useState('hearing untouched')
  const [touched, setTouched] = useState(false)
  const [focusTimeout, setFocusTimeout] = useState(false)
  const inputRef = createRef(null)

  const currentAnswer = useSelector(({ practice }) => practice.currentAnswers[word.ID])

  const dispatch = useDispatch()

  const { isWrong, tested } = word
  const value = currentAnswer ? currentAnswer.users_answer : ''

  useEffect(() => {
    if (tested) {
      if (isWrong) {
        setClassname('wrong')
      } else {
        setClassname('correct')
      }
    }
  }, [tested])

  const speakerClickHandler = (word) => {
    handleClick(word.surface, '')
    inputRef.current.focus()
  }

  const handleInputFocus = () => {
    if (!touched) {
      setClassname('hearing touched')
      setTouched(true)
      handleChange(value, word)
    }
    dispatch(setFocusedWord(word))
    if (!focusTimeout) {
      handleClick(word.surface, '')
      setFocusTimeout(true)
      setTimeout(() => {
        setFocusTimeout(false)
      }, 500)
    }
  }

  const handle = (e, word) => {
    handleChange(e.target.value, word)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { form } = e.target
      const index = Array.prototype.indexOf.call(form, e.target)
      form.elements[index + 1].focus()
      e.preventDefault()
    }
  }

  return (
    <span>
      <input
        onKeyDown={handleKeyDown}
        data-cy="exercise-hearing"
        ref={inputRef}
        key={word.ID}
        onChange={e => handle(e, word)}
        value={value}
        onFocus={handleInputFocus}
        className={className}
        style={{
          width: getTextWidth(word.surface),
          minWidth: getTextWidth(word.surface),
          marginRight: '2px',
          height: '1.5em',
          borderRadius: '6px',
          lineHeight: 'normal',
        }}
      />
      <Icon name="volume up" link onClick={() => speakerClickHandler(word.surface)} style={{ marginLeft: '-25px' }} />
    </span>
  )
}

export default ExerciseHearing
