import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils'
import flowRight from 'lodash/flowRight'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { getFlashcards } from 'Utilities/redux/flashcardReducer'
import { learningLanguageSelector, dictionaryLanguageSelector } from 'Utilities/common'
import useWindowDimension from 'Utilities/windowDimensions'
import Spinner from 'Components/Spinner'
import Flashcard from './Flashcard'
import FlashcardEndView from './FlashcardEndView'
import FlashcardNoCards from './FlashCardNoCards'

const VirtualizeSwipeableViews = flowRight(
  bindKeyboard,
  virtualize,
)(SwipeableViews)

const Flashcards = () => {
  const dispatch = useDispatch()
  const learningLanguage = useSelector(learningLanguageSelector)
  const dictionaryLanguage = useSelector(dictionaryLanguageSelector)
  const { cards, pending, deletePending } = useSelector(({ flashcards }) => flashcards)
  const [swipeIndex, setSwipeIndex] = useState(0)

  const bigScreen = useWindowDimension().width >= 415
  const { storyId } = useParams()

  useEffect(() => {
    dispatch(getFlashcards(learningLanguage, dictionaryLanguage, storyId))
  }, [storyId])

  useEffect(() => {
    setSwipeIndex(0)
  }, [pending])

  if (pending || deletePending || !cards) return <Spinner />

  // Limits so that you cant swipe back more than once.
  // React-swipeable-views has some weird behaviour with its index. This tries to fix it.
  let oldIndex
  const handleIndexChange = (index) => {
    if (swipeIndex < index) setSwipeIndex(index)
    if (index - oldIndex === 2) setSwipeIndex(swipeIndex)
    oldIndex = index
  }

  const handleNewDeck = () => {
    setSwipeIndex(0)
    dispatch(getFlashcards(learningLanguage, dictionaryLanguage, storyId))
  }

  const slideRenderer = ({ key, index }) => {
    if (index < cards.length) {
      const cardIndex = `${index + 1} / ${cards.length}`
      return (
        <Flashcard
          key={key}
          card={cards[index]}
          cardIndex={cardIndex}
          swipeIndex={swipeIndex}
          setSwipeIndex={setSwipeIndex}
          focusedAndBigScreen={swipeIndex === index && bigScreen}
        />
      )
    }
    return (
      <FlashcardEndView key="end-view" handleNewDeck={handleNewDeck} />
    )
  }

  if (!cards[0] || cards[0].format === 'no-cards') {
    return (
      <FlashcardNoCards setSwipeIndex={setSwipeIndex} />
    )
  }

  return (
    <div className="component-container flex">
      <VirtualizeSwipeableViews
        index={swipeIndex}
        onChangeIndex={handleIndexChange}
        containerStyle={{ maxWidth: '45em' }}
        slideRenderer={slideRenderer}
        slideCount={cards.length + 1}
        overscanSlideAfter={1}
        overscanSlideBefore={1}
        enableMouseEvents={!bigScreen}
      />
      <button
        type="button"
        onClick={() => handleIndexChange(swipeIndex + 1)}
        disabled={swipeIndex === cards.length || cards[0].format === 'no-cards'}
        className="flashcard-arrow-button"
        style={{ marginLeft: 0 }}
      >
        <Icon name="angle double right" size="huge" />
      </button>
    </div>
  )
}

export default Flashcards