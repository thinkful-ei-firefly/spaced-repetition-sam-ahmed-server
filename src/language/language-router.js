const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()
const jsonBodyParser = express.json();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const head = await LanguageService.getLanguageHead(
        req.app.get('db'),
        req.language.id
      )
      res.json({
        nextWord: head.original,
        totalScore: head.total_score,
        wordCorrectCount: head.correct_count,
        wordIncorrectCount: head.incorrect_count
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    try {
      const { guess, original, language_id } = req.body
      const translation = await LanguageService.getTranslation(
        req.app.get('db'),
        original
      )
      if (guess === translation.translation) {
        LanguageService.handleCorrectAnswer(req.app.get('db'), language_id, original)
          .then(response => res.json({correct:true, ...response}))
      } else {
        LanguageService.handleIncorrectAnswer(req.app.get('db'), language_id, original)
          .then(response => res.json({correct:false, ...response}))
      }
      next()
    } catch (error) {
      next(error)
    }
    // send guess and original
    // select * from table where original = submitted original
    // does actual===guess (if)
    // update score (if c)
    // update word (in)correct
    // update head
    // update next values
    // respond true/false
  })

module.exports = languageRouter
