import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { List, Button, Header, Segment, Icon, Dropdown } from 'semantic-ui-react'
import { Shake } from 'reshake'
import { FormattedMessage } from 'react-intl'
import { updateDictionaryLanguage } from 'Utilities/redux/userReducer'
import { getTranslationAction } from 'Utilities/redux/translationReducer'
import { learningLanguageSelector, translatableLanguages } from 'Utilities/common'
import { Spinner } from 'react-bootstrap'


const DictionaryHelp = ({ translation }) => {
  const [showHelp, setShow] = useState(false)
  const [shaking, setShaking] = useState(false)
  const dispatch = useDispatch()
  const translationLanguageCode = useSelector(({ user }) => user.data.user.last_trans_language)
  const learningLanguage = useSelector(learningLanguageSelector)
  const { pending } = useSelector(({ translation }) => translation)


  const dictionaryOptions = translatableLanguages[learningLanguage].map(element => ({
    key: element,
    value: element,
    text: element,
  }))

  const translations = translation ? translation.map(translated => (
    <List.Item key={translated.URL}>
      {translated.lemma}
      <List bulleted>
        {translated.glosses.map((word, i) => <List.Item key={`${translated.URL}-${i}`}>{word}</List.Item>)}
      </List>
    </List.Item>
  )) : 'no translation found'

  useEffect(() => {
    if (translations.length > 0) {
      setShaking(true)
      setTimeout(() => {
        setShaking(false)
      }, 500)
    }
  }, [translation])

  const handleDropdownChange = (e, data) => {
    if (translation) {
      const lemmas = translation.map(t => t.lemma).join('+')
      if (lemmas !== '')dispatch(getTranslationAction(learningLanguage, lemmas, data.value))
    }
    dispatch(updateDictionaryLanguage(data.value))
  }

  if (!showHelp) {
    return (
      <div style={{ position: 'fixed', right: '0.5%', bottom: '0.5%', backgroundColor: '#fafafa' }}>
        <Button
          className="navigationbuttonopen"
          icon
          basic
          onClick={() => setShow(true)}
        >
          <Shake
            h={5}
            v={5}
            r={3}
            dur={500}
            int={10}
            max={100}
            fixed
            fixedStop={false}
            freez={false}
            active={shaking}
          >
            <Icon size="large" name="book" />
          </Shake>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Segment className="navigationpanel" style={{ position: 'fixed', right: '5%', bottom: '2%', width: '90%' }}>
        <div>
          <FormattedMessage id="translation-target-language">
            {txt => <span style={{ marginRight: '5px' }}>{txt}</span>}
          </FormattedMessage>
          <Dropdown
            data-cy="dictionary-dropdown"
            closeOnChange
            defaultValue={translationLanguageCode || translatableLanguages[learningLanguage][0]}
            onChange={handleDropdownChange}
            options={dictionaryOptions}
          />
        </div>
        <Header size="medium" textAlign="center">
          <Button className="navigationbuttonclose" icon basic floated="right" onClick={() => setShow(false)}>
            <Icon name="angle down" />
          </Button>
        </Header>
        <List>
          {pending && <div><span>Loading, please wait </span><Spinner animation="border" /></div>}
          {translations.length > 0 ? translations : <FormattedMessage id="click-to-translate" />}
        </List>
      </Segment>
    </div>
  )
}

const mapStateToProps = ({ translation }) => ({ translation: translation.data })

export default connect(mapStateToProps, null)(DictionaryHelp)
