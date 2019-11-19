import React from 'react'

import { Input, Icon } from 'semantic-ui-react'

const ExerciseCloze = ({ word, handleChange, handleClick }) => {
  const { isWrong, mark, tested } = word

  let color = ''

  if (tested) {
    if (isWrong) {
      color = 'green'
    } else {
      color = 'red'
    }
  }

  return (
    <Input
      key={word.ID}
      icon={<Icon name="volume up" link onClick={() => handleClick(word.base, word.lemmas)} />}
      placeholder={`${word.base}...`}
      onChange={e => handleChange(e, word)}
      transparent
      style={{ width: `${Math.floor(word.surface.length * 15)}px`, height: '30px', backgroundColor: color }}
    />
  )
}


export default ExerciseCloze
