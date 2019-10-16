const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getLanguageHead(db, id) {
    return db
      .from('language')
      .join('word', {'language.head': 'word.id'})
      .select(
        'original',
        'correct_count',
        'incorrect_count',
        'total_score'
      )
      .where('language.id', '=', id)
      .first()
  },
  getTranslation(db, original) {
    return db
      .from('word')
      .select('translation')
      .where({ original })
      .first()
  },
  async handleCorrectAnswer(db, language_id, original) {
    const language = await this.getLanguage(db, language_id)
    const score = language.total_score
    await db.from('language').where({id:language_id}).update({total_score: score+1})
    const word = await db.from('word').where({ original, language_id }).select('*').first()
    await db.from('word').where({ original, language_id }).update({correct_count: word.correct_count+1, memory_value: word.memory_value*2})
    await this.moveWordDownList(db, word.memory_value*2, language_id)
    const head = await this.getLanguageHead(db, language_id)
    return {
      original: word.original,
      translation: word.translation,
      correct_count: word.correct_count+1,
      incorrect_count: word.incorrect_count,
      nextWord: head.original,
      total_score: head.total_score
    }
  },
  async handleIncorrectAnswer(db, language_id, original) {
    const word = await db.from('word').where({ original,language_id }).select('*').first()
    await db.from('word').where({ original, language_id }).update({incorrect_count: word.incorrect_count+1, memory_value: 1})
    await this.moveWordDownList(db, 1, language_id)
    const head = await this.getLanguageHead(db, language_id)
    return {
      original: word.original,
      translation: word.translation,
      correct_count: word.correct_count,
      incorrect_count: word.incorrect_count+1,
      nextWord: head.original,
      total_score: head.total_score
    }
    //"nextWord": "test-next-word-from-correct-guess",
  // "wordCorrectCount": 111,
  // "wordIncorrectCount": 222,
  // "totalScore": 333,
  // "answer": "test-answer-from-correct-guess",
  // "isCorrect": true
  },
  async moveWordDownList(db, num, language_id) {
    const headId = await this.getHead(db, language_id)
    let head = await this.getNode(db, headId.head)
    let tempNode = head
    for (let i=0; i<num;i++) {
      if (tempNode.next === null) {
        break
      } else {
        tempNode = await this.getNode(db, tempNode.next)
      }
    }
      await this.updateNext(db, head.id, tempNode.next, language_id)//head.next = tempNode.next
      await this.updateNext(db, tempNode.id, head.id, language_id)//tempNode.next = head
      await this.updateHead(db, language_id, head.next)//head = tempValue (setHead)
  },
  getNode(db, id) {
    return db
      .from('word')
      .select('*')
      .where({ id })
      .first() //{id: #, next: # or null}
  },
  getHead(db, id) {
    return db
      .from('language')
      .select('head')
      .where({ id })
      .first() //{head: #}
  },
  updateHead(db, language_id, word_id) {
    return db
      .from('language')
      .where({ id: language_id })
      .update({ head: word_id })
  },
  updateNext(db, id, next, language_id) {
    return db
      .from('word')
      .where({ id, language_id })
      .update({ next })
  },
  getLanguage(db, id) {
    return db
      .select('*')
      .from('language')
      .where({ id })
      .first()
  },
  getWord(db, id) {
    return db
      .select('*')
      .from('word')
      .where({ id })
      .first()
  }
}

module.exports = LanguageService
