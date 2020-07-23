import React, { createRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { getTextWidth, speak, learningLanguageSelector, respVoiceLanguages } from 'Utilities/common'
import { setFocusedWord } from 'Utilities/redux/practiceReducer'

const ExerciseHearing = ({ word, handleChange }) => {
  const [value, setValue] = useState('')

  const [className, setClassname] = useState('exercise hearing-untouched')
  const [touched, setTouched] = useState(false)
  const [focusTimeout, setFocusTimeout] = useState(false)
  const inputRef = createRef(null)

  const currentAnswer = useSelector(({ practice }) => practice.currentAnswers[word.ID])
  const learningLanguage = useSelector(learningLanguageSelector)

  const dispatch = useDispatch()

  const { isWrong, tested } = word

  const voice = respVoiceLanguages[learningLanguage]

  const giveHint = () => {
    if (word.base !== word.surface) handleChange(word.base, word)
  }

  const getExerciseClass = (tested, isWrong) => {
    if (!tested) return 'exercise hearing-untouched'
    if (isWrong) return 'exercise wrong'
    return 'exercise correct'
  }

  useEffect(() => {
    setClassname(getExerciseClass(tested, isWrong))
    if (tested && isWrong) giveHint()
  }, [tested])

  useEffect(() => {
    const val = currentAnswer ? currentAnswer.users_answer : ''
    setValue(val)
  }, [currentAnswer])

  const speakerClickHandler = word => {
    speak(word.surface, voice)
    inputRef.current.focus()
  }

  const handleInputFocus = () => {
    if (!touched) {
      if (!tested) setClassname('exercise hearing-touched')
      setTouched(true)
      handleChange(value, word)
    }
    dispatch(setFocusedWord(word))
    if (!focusTimeout) {
      speak(word.surface, voice)
      setFocusTimeout(true)
      setTimeout(() => {
        setFocusTimeout(false)
      }, 500)
    }
  }

  const handle = e => {
    setValue(e.target.value)
  }

  const handleBlur = () => {
    handleChange(value, word)
  }

  const handleKeyDown = e => {
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
        readOnly={tested && !isWrong}
        ref={inputRef}
        key={word.ID}
        onChange={handle}
        value={value}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        className={className}
        style={{
          width: getTextWidth(word.surface),
          minWidth: getTextWidth(word.surface),
          marginRight: '2px',
          height: '1.5em',
          lineHeight: 'normal',
        }}
      />
      <Icon
        name="volume up"
        link
        onClick={() => speakerClickHandler(word.surface)}
        style={{ marginLeft: '-25px' }}
      />
      {word.negation && <sup style={{ marginLeft: '3px', color: '#0000FF' }}>(neg)</sup>}
    </span>
  )
}

export default ExerciseHearing
