import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Placeholder, Card, Search, Select, Icon, Dropdown, Input } from 'semantic-ui-react'
import StoryListItem from 'Components/LibraryView/StoryListItem'
import { useIntl } from 'react-intl'
import CheckboxGroup from 'Components/CheckboxGroup'
import { capitalize, useLearningLanguage } from 'Utilities/common'
import { getGroups } from 'Utilities/redux/groupsReducer'
import { List, WindowScroller } from 'react-virtualized'
import { updateLibrarySelect, updateGroupSelect } from 'Utilities/redux/userReducer'
import { getAllStories } from 'Utilities/redux/storiesReducer'
import useWindowDimensions from 'Utilities/windowDimensions'
import StoryForm from './StoryForm'

const StoryList = () => {
  const intl = useIntl()
  const [sorter, setSorter] = useState('date')
  const [sortDirection, setSortDirection] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [smallScreenSearchOpen, setSmallScreenSearchOpen] = useState(false)
  const [searchedStories, setSearchedStories] = useState([])
  const [libraries, setLibraries] = useState({
    public: false,
    private: false,
    group: false,
  })
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user.data.user)
  const refreshed = useSelector(({ user }) => user.refreshed)
  const groups = useSelector(({ groups }) => groups.groups)
  const { pending, stories } = useSelector(({ stories }) => ({
    stories: stories.data,
    pending: stories.pending,
  }))
  const { sharedToGroupSinceLastFetch } = useSelector(({ share }) => share)
  const learningLanguage = useLearningLanguage()

  const smallWindow = useWindowDimensions().width < 520

  const smallScreenSearchbar = useRef()

  const setLibrary = library => {
    const librariesCopy = {}
    Object.keys(libraries).forEach(key => {
      librariesCopy[key] = false
    })

    setLibraries({ ...librariesCopy, [library]: true })
  }

  const handleLibraryChange = library => {
    dispatch(updateLibrarySelect(library))
    setLibrary(library)
    if (library === 'group' && sharedToGroupSinceLastFetch) {
      dispatch(
        getAllStories(learningLanguage, {
          sort_by: 'date',
          order: -1,
        })
      )
    }
  }

  useEffect(() => {
    dispatch(getGroups())
  }, [])

  useEffect(() => {
    if (!groups.find(g => g.group_id === user.last_selected_group) && groups[0]) {
      dispatch(updateGroupSelect(groups[0].group_id))
    }
  }, [groups])

  useEffect(() => {
    setLibrary(user.last_selected_library)
    if (user.last_selected_library !== 'private' && sorter === 'date') {
      setSorter('title')
    }
  }, [user.last_selected_library])

  const sortDropdownOptions = [
    { key: 'title', text: intl.formatMessage({ id: 'Title' }), value: 'title' },
    { key: 'difficulty', text: intl.formatMessage({ id: 'Difficulty' }), value: 'difficulty' },
    { key: 'progress', text: intl.formatMessage({ id: 'Progress' }), value: 'progress' },
  ]

  if (user.last_selected_library === 'private') {
    sortDropdownOptions.push({
      key: 'date',
      text: intl.formatMessage({ id: 'date-added' }),
      value: 'date',
    })
  }

  const groupDropdownOptions = groups.map(group => ({
    key: group.group_id,
    text: group.groupName,
    value: group.group_id,
  }))

  const handleSortChange = (_e, option) => {
    setSorter(option.value)
  }

  useEffect(() => {
    if (stories && searchString.length === 0) {
      setSearchedStories(stories)
    }
  }, [pending])

  useEffect(() => {
    const searchFilteredStories = stories
      ? stories.filter(story => story.title.toLowerCase().includes(searchString.toLowerCase()))
      : []

    setSearchedStories(searchFilteredStories)
  }, [searchString.length, pending])

  useEffect(() => {
    if (smallScreenSearchbar.current && smallScreenSearchOpen) smallScreenSearchbar.current.focus()
  }, [smallScreenSearchOpen])

  const handleGroupChange = (_e, option) => {
    dispatch(updateGroupSelect(option.value))
  }

  const handleSearchIconClick = () => {
    if (smallScreenSearchOpen) {
      setSearchString('')
      setSmallScreenSearchOpen(false)
    } else {
      setSmallScreenSearchOpen(true)
    }
  }

  const noResults = !pending && searchString.length > 0 && searchedStories.length === 0

  const libraryControls = (
    <div data-cy="library-controls" className="library-control">
      <div className="library-selection">
        <CheckboxGroup
          values={libraries}
          additionalClass="wrap-and-grow align-center padding-top-1"
          onClick={handleLibraryChange}
          reverse
        />
        {libraries.group && (
          <Select
            value={user.last_selected_group}
            options={groupDropdownOptions}
            onChange={handleGroupChange}
            disabled={!libraries.group}
            style={{ color: '#777', marginTop: '0.5em' }}
          />
        )}
      </div>
      <StoryForm setLibraries={setLibraries} />
      <div className="search-and-sort">
        <div className="flex align-center">
          <Dropdown
            value={sorter}
            options={sortDropdownOptions}
            onChange={handleSortChange}
            selection
          />
          <Icon
            style={{ cursor: 'pointer', marginLeft: '0.5em' }}
            name={sortDirection === 1 ? 'caret up' : 'caret down'}
            size="large"
            color="grey"
            onClick={() => setSortDirection(sortDirection * -1)}
          />
        </div>
        {smallWindow ? (
          <Icon
            name={smallScreenSearchOpen ? 'close' : 'search'}
            circular
            color="grey"
            onClick={handleSearchIconClick}
          />
        ) : (
          <Search
            open={false}
            icon={noResults ? 'ban' : 'search'}
            loading={pending}
            value={searchString}
            onSearchChange={e => setSearchString(e.target.value)}
            size="tiny"
            style={{ height: '100%' }}
          />
        )}
      </div>
      {smallScreenSearchOpen && (
        <Input
          icon="search"
          loading={pending}
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
          size="mini"
          fluid
          ref={smallScreenSearchbar}
        />
      )}
    </div>
  )

  if (pending || !searchedStories || !refreshed) {
    return (
      <div className="component-container">
        {libraryControls}
        <Placeholder>
          <Placeholder.Line />
        </Placeholder>
      </div>
    )
  }

  const librariesToShow = Object.entries(libraries)
    .filter(entry => entry[1])
    .map(([key]) => capitalize(key))

  const libraryFilteredStories = searchedStories.filter(story => {
    if (story.public) {
      return librariesToShow.includes('Public')
    }

    const showLibraries = []

    if (story.user === user.oid) {
      showLibraries.push('Private')
    }

    if (story.shared && story.sharedwith && story.sharedwith.includes(user.oid)) {
      showLibraries.push('Private')
    }

    if (story.groups) {
      if (story.groups.map(g => g.group_id).includes(user.last_selected_group)) {
        showLibraries.push('Group')
      }
    }

    return librariesToShow.some(value => showLibraries.includes(value))
  })

  const stringToDifficulty = difficulty => {
    switch (difficulty) {
      case 'low':
        return 1
      case 'average':
        return 2
      case 'high':
        return 3
      default:
        // null case
        return 4
    }
  }

  libraryFilteredStories.sort((a, b) => {
    let dir = 0
    switch (sorter) {
      case 'date':
        dir = new Date(b.date) - new Date(a.date)
        break
      case 'title':
        dir = a.title > b.title ? 1 : -1
        break
      case 'difficulty':
        dir = stringToDifficulty(a.difficulty) - stringToDifficulty(b.difficulty)
        break
      case 'progress':
        dir = a.percent_cov - b.percent_cov
        break
      default:
        break
    }

    return dir * sortDirection
  })

  const userCanShare = groups.find(group => group.is_teaching)

  function rowRenderer({ key, index, style }) {
    return (
      <div key={key} style={{ ...style, paddingRight: '0.5em', paddingLeft: '0.5em' }}>
        <StoryListItem
          key={key}
          userCanShare={userCanShare}
          libraryShown={libraries}
          story={libraryFilteredStories[index]}
          selectedGroup={user.last_selected_group}
        />
      </div>
    )
  }

  return (
    <div className="component-container">
      {libraryControls}
      <Card.Group itemsPerRow={1} doubling>
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <List
              autoHeight
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={libraryFilteredStories.length}
              rowHeight={130}
              rowRenderer={rowRenderer}
              scrollTop={scrollTop}
              width={10000}
            />
          )}
        </WindowScroller>
      </Card.Group>
    </div>
  )
}

export default StoryList
