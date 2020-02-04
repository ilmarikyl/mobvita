const { axios } = require('@util/common')

const getFlashcards = async (req, res) => {
  const { inputLanguage, outputLanguage } = req.params
  const url = `/flashcards/${inputLanguage}/${outputLanguage}`
  const response = await axios.get(url, { headers: req.headers })
  res.send(response.data)
}

module.exports = { getFlashcards }