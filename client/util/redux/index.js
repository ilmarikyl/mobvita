import { combineReducers } from 'redux'

import stories from './storiesReducer'
import snippets from './snippetsReducer'
import translation from './translationReducer'
import locale from './localeReducer'
import user from './userReducer'
import compete from './competitionReducer'
import sidebar from './sidebarReducer'
import email from './emailReducer'
import register from './registerReducer'
import notification from './notificationReducer'
import uploadProgress from './uploadProgressReducer'
import flashcards from './flashcardReducer'
import groups from './groupsReducer'
import share from './shareReducer'
import metadata from './metadataReducer'
import summary from './groupSummaryReducer'
import practice from './practiceReducer'
import passwordReset from './passwordResetReducer'
import studentProgress from './groupProgressReducer'
import tests from './testReducer'
import exerciseHistory from './exerciseHistoryReducer'
import crossword from './crosswordReducer'
import serverError from './serverErrorReducer'

const rootReducer = combineReducers({
  stories,
  snippets,
  translation,
  user,
  locale,
  compete,
  sidebar,
  email,
  register,
  notification,
  uploadProgress,
  flashcards,
  groups,
  share,
  metadata,
  summary,
  practice,
  passwordReset,
  studentProgress,
  tests,
  exerciseHistory,
  crossword,
  serverError,
})

export default (state, action) => (
  action.type === 'LOGOUT_SUCCESS'
    ? rootReducer(undefined, action)
    : rootReducer(state, action)
)
