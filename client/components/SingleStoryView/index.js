import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, Segment, Header } from 'semantic-ui-react'
import { Button, Spinner } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

import { getStoryAction } from 'Utilities/redux/storiesReducer'
import { getTranslationAction, clearTranslationAction } from 'Utilities/redux/translationReducer'
import { capitalize, learningLanguageSelector, rightAlignedLanguages } from 'Utilities/common'
import DictionaryHelp from 'Components/DictionaryHelp'
import Footer from '../Footer'

const SingleStoryView = ({ match }) => {
  const dispatch = useDispatch()
  const { story, pending } = useSelector(({ stories, locale }) => ({ story: stories.focused, pending: stories.focusedPending, locale }))
  const learningLanguage = useSelector(learningLanguageSelector)
  const dictionaryLanguage = useSelector(({ user }) => user.data.user.last_trans_language)
  const { id } = match.params
  useEffect(() => {
    dispatch(getStoryAction(id))
    dispatch(clearTranslationAction())
  }, [])

  if (!story || pending) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" size="lg" />
      </div>
    )
  }

  const handleWordClick = (surfaceWord, wordLemmas, wordId) => {
    // const selectedLocale = localeOptions.find(localeOption => localeOption.code === locale)
    window.responsiveVoice.speak(surfaceWord, `${learningLanguage === 'german' ? 'Deutsch' : capitalize(learningLanguage)} Female`)
    dispatch(
      getTranslationAction(
        capitalize(learningLanguage),
        wordLemmas,
        capitalize(dictionaryLanguage),
        id,
        wordId,
      ),
    )
  }

  const wordVoice = (word) => {
    if (word.bases) {
      return <span className="word-interactive" key={word.ID} onClick={e => handleWordClick(word.surface, word.lemmas, word.ID)}>{word.surface}</span>
    }
    return word.surface
  }

  const readClass = rightAlignedLanguages.includes(learningLanguage)
    ? 'component-container padding-top-2 right-aligned-text'
    : 'component-container padding-top-2'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={readClass}>
          <Header>
            {story.title}
            <Link to={`/stories/${id}/practice`}>
              <Button variant="primary" style={{ float: 'right', marginTop: '0.5em' }}>
                <FormattedMessage id="practice-now" />
              </Button>
            </Link>
          </Header>
          {story.url ? <a href={story.url}><FormattedMessage id="Source" /></a> : <div />}
          <Divider />
          <Segment>
            {story.paragraph.map(paragraph => (
              <p key={paragraph[0].ID}>
                {paragraph.map(word => wordVoice(word))}
              </p>
            ))}
          </Segment>
        </div>
        <DictionaryHelp />
      </div>
      <Footer />
    </div>
  )
}

export default SingleStoryView
