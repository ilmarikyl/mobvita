/**
 * Insert common items here
 */
import revitaLogoTransparent from 'Assets/revita_logo_transparent.png'
import practiceNow from 'Assets/practice_now.jpg'
import flagFinnish from 'Assets/flag_finnish.png'
import flagErzya from 'Assets/flag_erzya.png'
import flagKomizyrian from 'Assets/flag_komi-zyrian.png'
import flagSakha from 'Assets/flag_sakha.png'
import flagTatar from 'Assets/flag_tatar.png'
import flagUdmurt from 'Assets/flag_udmurt.png'
import flagMeadowmari from 'Assets/flag_meadow-mari.png'
import flagNorthsaami from 'Assets/flag_north-saami.png'
import flagCatalan from 'Assets/flag_catalan.png'
import flagGerman from 'Assets/flag_german.png'
import flagKazakh from 'Assets/flag_kazakh.png'
import flagPortuguese from 'Assets/flag_portuguese.png'
import flagRussian from 'Assets/flag_russian.png'
import flagSpanish from 'Assets/flag_spanish.png'
import flagSwedish from 'Assets/flag_swedish.png'
import flagFrench from 'Assets/flag_french.png'
import flagTurkish from 'Assets/flag_turkish.png'
import flagItalian from 'Assets/flag_italian.png'

export const images = {
  revitaLogoTransparent,
  practiceNow,
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
}

export const capitalize = (word) => {
  const firstLetter = word.slice(0, 1).toUpperCase()
  const wordEnd = word.slice(1, word.length)
  return `${firstLetter}${wordEnd}`
}

export const learningLanguageSelector = ({ user }) => user.data.user.last_used_language

export const supportedLearningLanguages = [
  'finnish', 'german', 'russian', 'kazakh', 'catalan', 'spanish', 'swedish', 'italian', 'french', 'turkish',
  'portuguese', 'erzya', 'komi-zyrian', 'meadow-mari', 'north-saami', 'sakha', 'tatar', 'udmurt',
].sort((a, b) => a.localeCompare(b))


export const colors = {}

export const localeOptions = [
  { name: 'Suomi', code: 'fi' },
  { name: 'Svenska', code: 'sv' },
  { name: 'Русский', code: 'ru' },
  { name: 'English', code: 'en' },
  { name: 'Italiano', code: 'it' },
]

export * from '@root/config/common'

export const getTextWidth = (text) => {
  const myCanvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = myCanvas.getContext('2d')
  context.font = '1rem monospace' // This should match with the defaultFont defined in custom.scss

  const metrics = context.measureText(text)
  return 65 + metrics.width // add just random number, lets hope its fine.
}
