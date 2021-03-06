import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Card, Icon, Label } from 'semantic-ui-react'
import { Button } from 'react-bootstrap'
import { updateGroupSelect } from 'Utilities/redux/userReducer'
import { deleteGroup, getGroupToken, leaveFromGroup } from 'Utilities/redux/groupsReducer'
import { setNotification } from 'Utilities/redux/notificationReducer'
import Spinner from 'Components/Spinner'
import Subheader from 'Components/Subheader'
import ConfirmationWarning from 'Components/ConfirmationWarning'
import AddToGroup from './AddToGroup'
import NoGroupsView from './NoGroupsView'

const GroupInviteInfo = ({ group }) => {
  const anyPeopleAdded = !!group.addedPeople.length
  const anyPendingInvitations = !!group.pendingInvitations.length
  const anyFailedInvitations = !!group.failedInvitations.length

  return (
    <Card.Content extra>
      {anyPeopleAdded && (
        <div className="padding-bottom-2">
          <Subheader translationId="added-to-the-group" color="#2CB22C" iconName="checkmark" />
          {group.addedPeople.map(email => (
            <Label key={email} content={email} style={{ marginBottom: '.5rem' }} />
          ))}
        </div>
      )}
      {anyPendingInvitations && (
        <div className="padding-bottom-2">
          <Subheader translationId="invitation-email-sent-to" color="#84C3A3" iconName="mail" />
          {group.pendingInvitations.map(email => (
            <Label key={email} content={email} style={{ marginBottom: '.5rem' }} />
          ))}
        </div>
      )}
      {anyFailedInvitations && (
        <div>
          <Subheader translationId="invitation-failed-for" color="#dc3545" iconName="ban" />
          {group.failedInvitations.map(email => (
            <Label key={email} content={email} style={{ marginBottom: '.5rem' }} />
          ))}
          <span style={{ display: 'block', fontSize: '12px', paddingLeft: '.5rem' }}>
            <FormattedMessage id="invitation-failure-explanation" />
          </span>
        </div>
      )}
    </Card.Content>
  )
}

const GroupCard = ({
  group,
  setAddToGroupId,
  setDeleteGroupId,
  setLeaveGroupId,
  showTokenGroupId,
  setShowTokenGroupId,
}) => {
  const { groupName, group_id: id, is_teaching: isTeaching } = group

  const showToken = showTokenGroupId === id

  const token = useSelector(state => state.groups.token)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleGroupNameClick = () => {
    dispatch(updateGroupSelect(id))
    history.push('/groups/analytics')
  }

  const handleSettingsClick = () => {
    history.push(`/groups/${id}/concepts`)
  }

  const handleShowTokenClick = () => {
    if (showToken) {
      setShowTokenGroupId(null)
    } else {
      dispatch(getGroupToken(id))
      setShowTokenGroupId(id)
    }
  }

  const handleTokenCopy = () => {
    dispatch(setNotification('token-copied', 'info'))
  }

  return (
    <Card fluid>
      <Card.Content
        extra
        onClick={isTeaching ? handleGroupNameClick : () => {}}
        style={{ cursor: 'pointer' }}
      >
        <h5 style={{ fontWeight: 'bold' }}>{groupName}</h5>
      </Card.Content>
      <Card.Content extra>
        <div className="space-between group-buttons sm" style={{ whiteSpace: 'nowrap' }}>
          {isTeaching && (
            <div className="gap-col-sm wrap-and-grow group-management-buttons">
              <Button onClick={handleSettingsClick}>
                <Icon name="settings" /> <FormattedMessage id="learning-settings" />
              </Button>
              <Button data-cy="add-to-group-modal" onClick={() => setAddToGroupId(id)}>
                <Icon name="plus" /> <FormattedMessage id="add-people-to-group" />
              </Button>
              <Button onClick={handleShowTokenClick}>
                <Icon name="key" /> <FormattedMessage id="show-group-token" />
              </Button>
            </div>
          )}
          <div className="group-management-buttons flex gap-col-sm">
            <Button variant="danger" onClick={() => setLeaveGroupId(id)} data-cy="leave-group">
              <Icon name="log out" /> <FormattedMessage id="Leave" />
            </Button>
            {isTeaching && (
              <Button
                data-cy="delete-group"
                variant="danger"
                onClick={() => setDeleteGroupId(id)}
                style={{ whiteSpace: 'nowrap' }}
              >
                <Icon name="trash alternate outline" /> <FormattedMessage id="Delete" />
              </Button>
            )}
          </div>
        </div>
        {showToken && (
          <div
            className="border rounded"
            style={{
              display: 'flex',
              marginTop: '0.5em',
              minHeight: '3em',
              wordBreak: 'break-all',
            }}
          >
            <span style={{ margin: 'auto', padding: '0.5em' }}>{token}</span>
            <CopyToClipboard text={token}>
              <Button type="button" onClick={handleTokenCopy}>
                <Icon name="copy" size="large" />
              </Button>
            </CopyToClipboard>
          </div>
        )}
      </Card.Content>
      {group.peopleInvited && <GroupInviteInfo group={group} />}
    </Card>
  )
}

const GroupManagement = () => {
  const { groups, pending } = useSelector(state => state.groups)
  const userId = useSelector(state => state.user.data.user.oid)

  const [addToGroupId, setAddToGroupId] = useState(null)
  const [deleteGroupId, setDeleteGroupId] = useState(false)
  const [leaveGroupId, setLeaveGroupId] = useState(false)
  const [showTokenGroupId, setShowTokenGroupId] = useState(null)

  const dispatch = useDispatch()

  const handleGroupDelete = () => {
    dispatch(deleteGroup(deleteGroupId))
  }

  const handleGroupLeave = () => {
    dispatch(leaveFromGroup(leaveGroupId, userId))
  }

  if (pending) return <Spinner fullHeight />

  if (groups.length === 0) return <NoGroupsView />

  return (
    <div className="ps-nm" data-cy="group-list">
      <AddToGroup groupId={addToGroupId} setGroupId={setAddToGroupId} />
      <ConfirmationWarning
        open={!!deleteGroupId}
        setOpen={setDeleteGroupId}
        action={handleGroupDelete}
      >
        <FormattedMessage id="this-will-remove-the-group-are-you-sure-you-want-to-proceed" />
      </ConfirmationWarning>
      <ConfirmationWarning
        open={!!leaveGroupId}
        setOpen={setLeaveGroupId}
        action={handleGroupLeave}
      >
        <FormattedMessage id="Are you sure you want to leave the group?" />
      </ConfirmationWarning>
      {groups.map(group => (
        <GroupCard
          key={group.group_id}
          group={group}
          setAddToGroupId={setAddToGroupId}
          setDeleteGroupId={setDeleteGroupId}
          setLeaveGroupId={setLeaveGroupId}
          showTokenGroupId={showTokenGroupId}
          setShowTokenGroupId={setShowTokenGroupId}
        />
      ))}
    </div>
  )
}

export default GroupManagement
