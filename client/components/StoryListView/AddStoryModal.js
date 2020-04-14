import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FormControl, Spinner } from 'react-bootstrap'
import { learningLanguageSelector, capitalize } from 'Utilities/common'
import { postStory, setCustomUpload } from 'Utilities/redux/uploadProgressReducer'

const AddStoryModal = ({ trigger }) => {
  const [text, setText] = useState('')

  const learningLanguage = useSelector(learningLanguageSelector)
  const { pending, storyId } = useSelector(({ uploadProgress }) => uploadProgress)
  const dispatch = useDispatch()

  const addText = async () => {
    const newStory = {
      language: capitalize(learningLanguage),
      text,
    }
    await dispatch(setCustomUpload(true))
    dispatch(postStory(newStory))
  }


  return (
    <Modal
      dimmer="inverted"
      closeIcon
      trigger={trigger}
    >
      <Modal.Header><FormattedMessage id="add-your-stories" /></Modal.Header>
      <Modal.Content style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: '550' }}><FormattedMessage id="paste-the-raw-text-you-want-to-add-as-a-story-we-will-use-the-first-sentence-before-an-empty-line-as" /></span>
        <FormControl
          as="textarea"
          rows={8}
          className="story-text-input"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={addText}
          disabled={!text || pending || storyId}
        >
          {pending || storyId ? <Spinner animation="border" variant="dark" size="lg" />
            : <FormattedMessage id="Confirm" />}

        </Button>
      </Modal.Content>

    </Modal>
  )
}

export default AddStoryModal
