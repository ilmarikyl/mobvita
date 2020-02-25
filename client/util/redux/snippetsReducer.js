import callBuilder from '../apiConnection'
/**
 * Actions and reducers are in the same file for readability
 */

const filterPrevious = (previous, snippet) => {
  if (!snippet) {
    return []
  }
  const filteredPrevious = previous
    .filter(prev => prev && prev.snippetid[0] < snippet.snippetid[0])

  return filteredPrevious
}

export const getCurrentSnippet = (storyId) => {
  const route = `/snippets/story/${storyId}/current`
  const prefix = 'GET_CURRENT_SNIPPET'
  return callBuilder(route, prefix)
}

export const getNextSnippet = (storyId, currentSnippetId) => {
  const route = `/snippets/story/${storyId}/next?previous=${currentSnippetId}`
  const prefix = 'GET_NEXT_SNIPPET'
  return callBuilder(route, prefix)
}

export const resetCurrentSnippet = (storyId) => {
  const route = `/snippets/story/${storyId}/reset`
  const prefix = 'RESET_SNIPPET_INDEX'
  return callBuilder(route, prefix, 'post')
}

export const postAnswers = (storyId, answersObject, compete = false) => {
  const payload = answersObject
  payload.compete = compete
  const route = `/snippets/story/${storyId}/answer`
  const prefix = 'GET_SNIPPET_ANSWERS'
  return callBuilder(route, prefix, 'post', payload)
}

// Reducer
// You can include more app wide actions such as "selected: []" into the state
export default (state = { previous: [] }, action) => {
  switch (action.type) {
    case 'RESET_SNIPPET_INDEX_SUCCESS':
      return {
        ...state,
        previous: [],
        focused: action.response,
        pending: false,
        error: false,
      }
    case 'GET_CURRENT_SNIPPET_ATTEMPT':
      return {
        ...state,
        pending: true,
        error: false,
      }
    case 'GET_CURRENT_SNIPPET_FAILURE':
      return {
        ...state,
        pending: false,
        error: true,
      }
    case 'GET_CURRENT_SNIPPET_SUCCESS':
      return {
        ...state,
        focused: action.response,
        previous: filterPrevious(state.previous.concat(state.focused), action.response),
        pending: false,
        error: false,
      }
    case 'GET_SNIPPET_ANSWERS_SUCCESS':
      return {
        ...state,
        focused: action.response,
      }
    case 'GET_STORY_ATTEMPT':
      return {
        ...state,
        focused: undefined,
        previous: [],
      }
    case 'GET_NEXT_SNIPPET_ATTEMPT':
      return {
        ...state,
        pending: true,
        error: false,
      }
    case 'GET_NEXT_SNIPPET_FAILURE':
      return {
        ...state,
        pending: false,
        error: true,
      }
    case 'GET_NEXT_SNIPPET_SUCCESS':
      return {
        ...state,
        focused: action.response,
        previous: filterPrevious(state.previous.concat(state.focused), action.response),
        pending: false,
        error: false,
      }
    default:
      return state
  }
}
