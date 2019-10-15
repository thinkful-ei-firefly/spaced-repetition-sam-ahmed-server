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
    await db.from('language').where({id:1}).update({total_score: score.total_score+1})
    console.log('ran')
    const word = await db.from('word').where({ original }).select('correct_count, memory_value').first()
    await db.from('word').where({ original }).update({correct_count: word.correct_count+1, memory_value: word.memory_value*2})
    let head = await this.getHead(db, language_id)
    await this.moveWordDownList(db, word.memory_value*2, language_id)
    await this.setHead(db, language_id, head.next)
    return this.getLanguageHead(db, language_id)
  },
  async handleIncorrectAnswer(db, language_id, original) {
    const word = db.from('word').where({ original }).select('incorrect_count').first()
    db.from('word').where({ original }).update({incorrect_count: word.correct_count+1, memory_value: 1})
    let head = this.getHead(db, language_id)
    this.moveWordDownList(db, 1, language_id)
    this.setHead(db, language_id, head.next)
    return this.getLanguageHead(db, language_id)
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
      await this.updateNext(head.id, tempNode.next)//head.next = tempNode.next
      await this.updateNext(tempNode.id, head.id)//tempNode.next = head 
      await this.updateHead(db, language_id, head.id)//head = tempValue (setHead)
    }
  },
  getNode(db, id) {
    return db
      .from('word')
      .select('id, next')
      .where({ id })
      .first() //{id: #, next: # or null}
  },
  getHead(db, id) {
    return db
      .from('language')
      .select('head', 'next')
      .where({ id })
      .first() //{head: #}
  },
  setHead(db, language_id, word_id) {
    return db
      .from('language')
      .where({ id: language_id })
      .update({ head: word_id })
  },
  updateNext(db, id, next) {
    return db
      .from('word')
      .where({ id })
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
