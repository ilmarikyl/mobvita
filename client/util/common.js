/**
 * Insert common items here
 */
import sanitize from 'sanitize-html'
import revitaLogoTransparent from 'Assets/images/revita_logo_transparent.png'
import practiceNow from 'Assets/images/practice_now.jpg'
import flagFinnish from 'Assets/images/flags/flag_finnish.png'
import flagErzya from 'Assets/images/flags/flag_erzya.png'
import flagKomizyrian from 'Assets/images/flags/flag_komi-zyrian.png'
import flagSakha from 'Assets/images/flags/flag_sakha.png'
import flagTatar from 'Assets/images/flags/flag_tatar.png'
import flagUdmurt from 'Assets/images/flags/flag_udmurt.png'
import flagMeadowmari from 'Assets/images/flags/flag_meadow-mari.png'
import flagNorthsaami from 'Assets/images/flags/flag_north-saami.png'
import flagCatalan from 'Assets/images/flags/flag_catalan.png'
import flagGerman from 'Assets/images/flags/flag_german.png'
import flagKazakh from 'Assets/images/flags/flag_kazakh.png'
import flagPortuguese from 'Assets/images/flags/flag_portuguese.png'
import flagRussian from 'Assets/images/flags/flag_russian.png'
import flagSpanish from 'Assets/images/flags/flag_spanish.png'
import flagSwedish from 'Assets/images/flags/flag_swedish.png'
import flagFrench from 'Assets/images/flags/flag_french.png'
import flagTurkish from 'Assets/images/flags/flag_turkish.png'
import flagItalian from 'Assets/images/flags/flag_italian.png'
import flagSyriac from 'Assets/images/flags/flag_syriac.png'
import flagChinese from 'Assets/images/flags/flag_prc.png'
import culture1 from 'Assets/images/culture1.jpg'
import politics1 from 'Assets/images/politics1.jpg'
import science1 from 'Assets/images/science1.jpg'
import sport1 from 'Assets/images/sport1.jpg'
import flashcards from 'Assets/images/flashcards.jpg'
import logo from 'Assets/images/logo_transparent.png'
import flashcardIcon from 'Assets/images/flashcard_icon.png'
import bronzeMedal from 'Assets/images/medals/bronze_medal.png'
import silverMedal from 'Assets/images/medals/silver_medal.png'
import goldMedal from 'Assets/images/medals/gold_medal.png'
import platinumMedal from 'Assets/images/medals/platinum_medal.png'
import diamondMedal from 'Assets/images/medals/diamond_medal.png'
import unlockedMedal from 'Assets/images/medals/unlocked_medal.png'
import firstMedal from 'Assets/images/medals/first_medal.svg'
import secondMedal from 'Assets/images/medals/second_medal.svg'
import thirdMedal from 'Assets/images/medals/third_medal.svg'
import wreadth from 'Assets/images/wreadth.png'
import fancyWreadth from 'Assets/images/fancy_wreadth.png'
import trophy from 'Assets/images/trophy.svg'
import leaderboard from 'Assets/images/leaderboard.svg'

import { useSelector } from 'react-redux'
import { callApi } from './apiConnection'

export const images = {
  revitaLogoTransparent,
  practiceNow,
  culture1,
  politics1,
  science1,
  sport1,
  flagFinnish,
  flagUdmurt,
  flagErzya,
  flagKomizyrian,
  flagMeadowmari,
  flagSakha,
  flagTatar,
  flagNorthsaami,
  flagSwedish,
  flagItalian,
  flagGerman,
  flagRussian,
  flagKazakh,
  flagCatalan,
  flagSpanish,
  flagPortuguese,
  flagTurkish,
  flagFrench,
  flagSyriac,
  flagChinese,
  flashcards,
  logo,
  flashcardIcon,
  bronzeMedal,
  silverMedal,
  goldMedal,
  platinumMedal,
  diamondMedal,
  unlockedMedal,
  firstMedal,
  secondMedal,
  thirdMedal,
  wreadth,
  fancyWreadth,
  trophy,
  leaderboard,
}

export const capitalize = word => {
  const capitalizedParts = word.split('-').map(part => {
    const p1 = part.slice(0, 1)
    const p2 = part.slice(1, part.length)
    return p1.toUpperCase() + p2
  })

  return capitalizedParts.join('-')
}

/*
export const capitalize = (word = '') => {
  const firstLetter = word.slice(0, 1).toUpperCase()
  const wordEnd = word.slice(1, word.length)
  return `${firstLetter}${wordEnd}`
}
*/

export const learningLanguageSelector = ({ user }) =>
  user.data ? user.data.user.last_used_language : null
export const dictionaryLanguageSelector = ({ user }) => user.data.user.last_trans_language

export const useLearningLanguage = () => useSelector(learningLanguageSelector)
export const useDictionaryLanguage = () => useSelector(dictionaryLanguageSelector)
export const useCurrentUser = () => useSelector(({ user }) => user.data.user)

export const supportedLearningLanguages = {
  major: [
    'finnish',
    'german',
    'russian',
    'kazakh',
    'catalan',
    'spanish',
    'swedish',
    'italian',
    'french',
    'portuguese',
  ].sort((a, b) => a.localeCompare(b)),
  minor: [
    'erzya',
    'komi-zyrian',
    'meadow-mari',
    'north-saami',
    'sakha',
    'tatar',
    'udmurt',
    'turkish',
  ].sort((a, b) => a.localeCompare(b)),
  experimental: ['syriac', 'chinese'],
}

export const learningLanguageLocaleCodes = {
  Finnish: 'fi',
  German: 'de',
  Russian: 'ru',
  Kazakh: 'kz',
  Catalan: 'ca',
  Spanish: 'es',
  Swedish: 'sv',
  Italian: 'it',
  French: 'fr',
  Portuguese: 'pt',
  Erzya: 'myv',
  'Komi-Zyrian': 'kpv',
  'Meadow-Mari': 'mhr',
  'North-Saami': 'se',
  Sakha: 'ru-sa',
  Tatar: 'tt',
  Udmurt: 'udm',
  Turkish: 'tr',
  Syriac: 'syc',
  Chinese: 'zh',
}

export const betaLanguages = [
  'catalan',
  'french',
  'italian',
  'portuguese',
  'spanish',
  'swedish',
  'north-saami',
  'sakha',
  'syriac',
  'turkish',
]

export const exerciseMaskedLanguages = [
  'Chinese'
]

export const colors = {}

export const flashcardColors = {
  background: ['#F3826A', '#FEA75C', '#F9E79F', '#84C3A3', '#50A278'],
  foreground: ['#055A5B', '#055A5B', '#055A5B', '#055A5B', '#055A5B'],
}

export const localeOptions = [
  { displayName: 'Suomi', name: 'Finnish', code: 'fi' },
  //{ displayName: 'Svenska', name: 'Swedish', code: 'sv' },
  { displayName: 'Русский', name: 'Russian', code: 'ru' },
  { displayName: 'English', name: 'English', code: 'en' },
  { displayName: 'Italiano', name: 'Italian', code: 'it' },
]

export const localeNameToCode = name => {
  const localeObject = localeOptions.find(option => option.name === name)
  if (localeObject) {
    return localeObject.code
  }
  return 'en'
}
export const localeCodeToName = code => localeOptions.find(option => option.code === code).name

export const checkRevitaStatus = async () => {
  const result = await callApi('/revitaStatus')
  return result
}

const defaultAllowed = ['b', 'i', 'em', 'strong', 'br', 'mark', 'small', 'sub', 'sup', 'ins', 'del']

export const sanitizeHtml = (dirty, allowedTags = defaultAllowed) => {
  const defaultOptions = { allowedTags }
  return { __html: sanitize(dirty, defaultOptions) }
}

export * from '@root/config/common'

export const rightAlignedLanguages = ['Syriac']

export const specialFonts = { Syriac: { fontFamily: 'NotoSansSyriacEastern', fontSize: '1.7rem' } }
export const titleFontSizes = { Syriac: '2rem' }
export const tooltipFontSizes = { Syriac: '1rem' }

export const getTextStyle = (language, type) => {
  let style = {}
  if (rightAlignedLanguages.includes(language)) style = { textAlign: 'right', direction: 'rtl' }
  if (specialFonts[language]) style = { ...style, ...specialFonts[language] }
  if (type === 'title' && titleFontSizes[language]) {
    style = { ...style, fontSize: titleFontSizes[language] }
  }
  if (type === 'tooltip' && tooltipFontSizes[language]) {
    style = { ...style, fontSize: tooltipFontSizes[language] }
  }
  return style
}

export const getTextWidth = text => {
  const myCanvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = myCanvas.getContext('2d')
  context.font = '1em Arial' // This should match with the defaultFont defined in custom.scss

  const metrics = context.measureText(text)
  return 65 + metrics.width // add just random number, lets hope its fine.
}

export const speak = (surfaceWord, voice) => {
  try {
    if (window.responsiveVoice.voiceSupport()) window.responsiveVoice.speak(surfaceWord, voice)
  } catch (e) {
    console.log(`Failed to speak ${surfaceWord} in ${capitalize(voice)}`)
  }
}

export const respVoiceLanguages = {
  Catalan: 'Catalan Male',
  Finnish: 'Finnish Female',
  French: 'French Female',
  German: 'Deutsch Female',
  Italian: 'Italian Female',
  Portuguese: 'Portuguese Female',
  Russian: 'Russian Female',
  Spanish: 'Spanish Female',
  Swedish: 'Swedish Female',
  Turkish: 'Turkish Female',
  Chinese: 'Chinese Female'
}

export const translatableLanguages = {
  Finnish: [
    'English',
    'French',
    'German',
    'Russian',
    'Spanish',
    'Finnish',
    'Swedish',
    'Turkish',
    'Italian',
    'Polish',
    'Czech',
    'Norwegian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Hindi',
  ],
  Russian: [
    'English',
    'Finnish',
    'Chinese',
    'French',
    'German',
    'Italian',
    'Norwegian',
    'Spanish',
    'Swedish',
    'Turkish',
    'Japanese',
    'Kazakh',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  Spanish: [
    'Chinese',
    'English',
    'Finnish',
    'French',
    'German',
    'Italian',
    'Norwegian',
    'Russian',
    'Swedish',
    'Turkish',
    'Japanese',
    'Kazakh',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  Italian: [
    'Chinese',
    'English',
    'Finnish',
    'French',
    'German',
    'Spanish',
    'Norwegian',
    'Russian',
    'Swedish',
    'Turkish',
    'Japanese',
    'Kazakh',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  Catalan: [
    'Spanish',
    'Chinese',
    'English',
    'Finnish',
    'German',
    'Italian',
    'Norwegian',
    'Russian',
    'Swedish',
    'Turkish',
    'Japanese',
    'Kazakh',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  French: [
    'Spanish',
    'Chinese',
    'English',
    'Finnish',
    'German',
    'Italian',
    'Norwegian',
    'Russian',
    'Swedish',
    'Turkish',
    'Japanese',
    'Kazakh',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  Portuguese: [
    'Spanish',
    'Chinese',
    'English',
    'Finnish',
    'German',
    'Italian',
    'Norwegian',
    'Russian',
    'Swedish',
    'Turkish',
    'Japanese',
    'Kazakh',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  German: [
    'Chinese',
    'English',
    'Finnish',
    'French',
    'Italian',
    'Norwegian',
    'Russian',
    'Spanish',
    'Swedish',
    'Turkish',
    'Japanese',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  Swedish: [
    'Chinese',
    'English',
    'Finnish',
    'French',
    'Italian',
    'Norwegian',
    'Russian',
    'Spanish',
    'German',
    'Turkish',
    'Japanese',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  'Komi-Zyrian': ['Russian'],
  'Meadow-Mari': ['Russian'],
  Udmurt: ['Russian'],
  Sakha: ['Russian', 'English'],
  'North-Saami': ['Finnish', 'Norwegian'],
  Erzya: ['Russian'],
  Kazakh: ['Russian', 'English'],
  Tatar: [
    'Chinese',
    'English',
    'Finnish',
    'French',
    'Italian',
    'Norwegian',
    'Russian',
    'Spanish',
    'Swedish',
    'Turkish',
    'Japanese',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
  ],
  Turkish: [
    'Chinese',
    'English',
    'Finnish',
    'French',
    'Italian',
    'Norwegian',
    'Russian',
    'Spanish',
    'Swedish',
    'Japanese',
    'Polish',
    'Czech',
    'Portuguese',
    'Hindi',
    'Finnish',
  ],
  Livvi: ['Finnish'],
  Syriac: [],
  Chinese: [
    'English',
    'French',
    'German',
    'Russian',
    'Spanish',
    'Finnish',
    'Swedish',
    'Turkish',
    'Italian',
    'Polish',
    'Czech',
    'Norwegian',
    'Portuguese',
    'Japanese',
    'Hindi',
  ],
}
