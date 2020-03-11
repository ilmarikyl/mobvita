import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { getConcepts } from 'Utilities/redux/conceptReducer'

const SettingsModal = ({ trigger }) => {
  const { user } = useSelector(({ user }) => ({ user: user.data.user }))
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getConcepts(user.last_used_language))
  // }, [])


  return (
    <Modal trigger={trigger}>
      <Modal.Header>
        Learning settings
      </Modal.Header>
      <Modal.Content style={{ display: 'flex', flexDirection: 'column' }}>
        <span className="label">Exercise difficulty level</span>
        <ButtonGroup name="difficultyButtons" size="md">
          <Button>A1</Button>
          <Button>A2</Button>
          <Button>B1</Button>
          <Button>B2</Button>
          <Button>C1</Button>
          <Button>C2</Button>
        </ButtonGroup>
      </Modal.Content>
    </Modal>
  )
}

export default SettingsModal