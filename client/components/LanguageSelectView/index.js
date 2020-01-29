import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { images, capitalize, supportedLearningLanguages, learningLanguageSelector } from 'Utilities/common'
import { updateLearningLanguage } from 'Utilities/redux/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const LearningLanguageSelectView = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)
  const learningLanguage = useSelector(learningLanguageSelector)
  const { pending } = user

  const [learningLanguageChanged, setLearningLanguageChanged] = useState(false)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    if (!pending && waiting && learningLanguage) {
      setLearningLanguageChanged(true)
      setWaiting(false)
    }
  }, [pending])

  const handleLearningLanguageChange = (lang) => {
    dispatch(updateLearningLanguage(lang))
    setWaiting(true)
  }

  if (learningLanguageChanged) {
    return (
      <Redirect
        to={{
          pathname: '/home',
          state: { from: '/languageSelectView' },
        }}
      />
    )
  }


  return (
    <Container textAlign="center">
      <h2 data-cy="choose-lang">
        <FormattedMessage id="CHOOSE_LANG" />
      </h2>
      <Segment style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {supportedLearningLanguages.map(lang => (
          <div onClick={() => handleLearningLanguageChange(lang)} style={{ width: '7em', display: 'flex', flexDirection: 'column', margin: '1.5em', alignItems: 'center' }}>
            <img src={images[`flag${capitalize(lang.split('-').join(''))}`]} style={{ height: '3em', border: '1px solid whitesmoke' }} alt={lang} />
            <span style={{ color: 'black' }}><FormattedMessage id={lang.split('-').map(l => capitalize(l)).join('-')} /></span>
          </div>
        ))}
      </Segment>
    </Container>
  )
}
export default LearningLanguageSelectView
