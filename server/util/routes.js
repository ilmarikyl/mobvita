const Router = require('express')
const stories = require('@controllers/storiesController')
const snippets = require('@controllers/snippetsController')
const session = require('@controllers/sessionController')
const translation = require('@controllers/translationController')
const opponent = require('@controllers/opponentController')
const user = require('@controllers/userController')
const email = require('@controllers/emailController')
const flashcards = require('@controllers/flashcardsController')
const groups = require('@controllers/groupsController')
const { unknown } = require('@controllers/fallbackController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))

router.get('/stories/:storyId/loading', stories.getUploadProgress)

router.get('/stories/:language', stories.getAll)
router.get('/stories/:language/:id', stories.getOne)
router.post('/stories', stories.createOne)

router.get('/flashcards/:inputLanguage/:outputLanguage', flashcards.getFlashcards)
router.get('/flashcards/:inputLanguage/:outputLanguage/:storyId', flashcards.getStoryFlashcards)
router.post('/flashcards/:inputLanguage/:outputLanguage/answer', flashcards.recordFlashcardAnswer)

router.get('/snippets/story/:storyId/current', snippets.getCurrent)
router.get('/snippets/story/:storyId/next', snippets.getNext)
router.post('/snippets/story/:storyId/reset', snippets.reset)
router.post('/snippets/story/:storyId/answer', snippets.postAnswers)

router.post('/translation/:locale/:language', translation.getTranslation)

router.get('/opponent', opponent.getOpponent)

router.post('/session', session.create)

router.get('/groups', groups.getGroups)
router.post('/groups', groups.createGroup)
router.post('/groups/:groupId', groups.addToGroup)
router.post('/groups/:groupId/remove/:userId', groups.deleteFromGroup)

router.get('/user', user.getSelf)
router.post('/user', user.setSelf)
router.post('/user/remove', user.remove)
router.post('/register', user.register)
router.post('/confirm', user.confirm)
router.post('/confirm/test', user.testConfirm)
router.post('/contact', email.sendEmail)

router.post('/*', unknown)
router.get('/*', unknown)

module.exports = router
