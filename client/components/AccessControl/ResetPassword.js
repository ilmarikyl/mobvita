import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from 'react-bootstrap'
import { Form } from 'semantic-ui-react'
import { resetPassword } from 'Utilities/redux/passwordResetReducer'

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const intl = useIntl()
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== repeat) {
      setError(true)
      return
    }

    dispatch(resetPassword(password, match.params.token))
    history.replace('/login')
  }

  return (
    <div className="cont-narrow auto pt-xl">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Input
            label={intl.formatMessage({ id: 'new-password' })}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={error}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label={intl.formatMessage({ id: 'repeat-password' })}
            type="password"
            value={repeat}
            onChange={e => setRepeat(e.target.value)}
            error={error}
          />
        </Form.Field>
        <Form.Field>
          <Button variant="primary" type="submit">
            <FormattedMessage id="Confirm" />
          </Button>
        </Form.Field>
      </Form>
    </div>
  )
}

export default ResetPassword
