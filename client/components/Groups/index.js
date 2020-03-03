import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroups, removeFromGroup, deleteGroup } from 'Utilities/redux/groupsReducer'
import {
  Dropdown,
  ListGroup,
  Button,
} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'semantic-ui-react'
import AddGroup from './AddGroup'
import AddToGroup from './AddToGroup'
import CollapsingList from './CollapsingList'

const GroupView = () => {
  const [addToGroupOpen, setAddToGroupOpen] = useState(false)
  const [addGroupOpen, setAddGroupOpen] = useState(false)
  const [currentGroupId, setCurrentGroupId] = useState(null)
  const dispatch = useDispatch()

  const { groups, created } = useSelector(({ groups }) => (
    {
      groups: groups.groups,
      created: groups.created,
    }
  ))

  useEffect(() => {
    dispatch(getGroups())
  }, [])

  useEffect(() => {
    if (!groups || groups.length === 0) return
    if (currentGroupId && groups.some(group => group.group_id === currentGroupId)) return
    setCurrentGroupId(groups[0].group_id)
  }, [groups])

  useEffect(() => {
    if (!created) return
    setCurrentGroupId(created.group_id)
  }, [created])

  const removeUser = (userId) => {
    dispatch(removeFromGroup(currentGroupId, userId))
  }

  if (!groups) {
    return null
  }

  if (!currentGroupId) {
    return (
      <div className="group-controls">
        <div>you have no groups yet!</div>
        <Button
          data-cy="create-group-modal"
          variant="primary"
          onClick={() => setAddGroupOpen(true)}
        >
          <FormattedMessage id="create-new-group" />
        </Button>

        <AddGroup isOpen={addGroupOpen} setOpen={setAddGroupOpen} />
      </div>
    )
  }

  const currentGroup = groups.find(group => group.group_id === currentGroupId)

  return (
    <div className="group-container">
      <div className="group-controls">
        <Dropdown data-cy="select-group" onSelect={key => setCurrentGroupId(key)}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {currentGroup.groupName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {groups.map(group => (
              <Dropdown.Item eventKey={group.group_id} key={group.group_id}>{group.groupName}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          data-cy="create-group-modal"
          variant="info"
          onClick={() => setAddGroupOpen(true)}
        >
          <FormattedMessage id="create-new-group" />
        </Button>

        <AddGroup isOpen={addGroupOpen} setOpen={setAddGroupOpen} />
      </div>
      <CollapsingList header="Teachers">
        <ListGroup>
          {currentGroup.teachers.map(teacher => (
            <ListGroup.Item key={teacher.userName}>{teacher.userName}</ListGroup.Item>
          ))}
        </ListGroup>
      </CollapsingList>
      <CollapsingList header="Students">
        <ListGroup style={{
          maxHeight: '50vh',
          overflowY: 'auto',
        }}
        >
          {currentGroup.students.length === 0 ? <ListGroup.Item /> : currentGroup.students.map(student => (
            <ListGroup.Item key={student.userName}>
              {student.userName}
              <Icon onClick={() => removeUser(student._id)} name="close" />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </CollapsingList>
      {currentGroup.is_teaching
        && (
          <>
            <Button
              style={{ marginTop: '1em' }}
              data-cy="add-to-group-modal"
              onClick={() => setAddToGroupOpen(true)}
            >
              <FormattedMessage id="add-people-to-group" />
            </Button>
            <AddToGroup groupId={currentGroupId} isOpen={addToGroupOpen} setOpen={setAddToGroupOpen} />
            <Button style={{ marginTop: '1em' }} variant="danger" onClick={() => dispatch(deleteGroup(currentGroupId))}>remove group</Button>
          </>
        )}
    </div>
  )
}

export default GroupView
