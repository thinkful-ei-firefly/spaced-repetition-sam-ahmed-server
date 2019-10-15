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

  getLanguageAndWords(db, language_id) {
    return db
      .from('word')
      .join('language', {'word.language_id': 'language.id'})
      .select('*')
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
    const info = await this.getLanguageAndWords(db, language_id)
    await db.from('language').where({id:language_id}).update({total_score: info[0].total_score+1})
    await db.from('word').where({ original }).update({correct_count: info[0].correct_count+1, memory_value: info[0].memory_value*2})
    await this.moveWordDownList(db, info[0].memory_value*2, info)
    return this.getLanguageHead(db, language_id)
  },
  handleIncorrectAnswer(db, language_id, original) {
    const word = db.from('word').where({ original }).select('incorrect_count').first()
    db.from('word').where({ original }).update({incorrect_count: word.correct_count+1, memory_value: 1})
    let head = this.getHead(db, language_id)
    this.moveWordDownList(db, 1, language_id)
    this.setHead(db, language_id, head.next)
    return this.getLanguageHead(db, language_id)
  },
  moveWordDownList(db, n, info) {
    //nth.next = head
    //head.next=nth+1
    //head=head.next
    headIndex = arr[0].head
    let i=0
    while (tempNode.id !==headIndex || i<info.length) {
      tempNode = arr[i++]
    }
    head = tempNode
    let j=0
    while (tempNode.next !==null) {
      if(j=n) break
      tempNode = j++
    }
     
    this.updateNext(head.id, tempNode.next)//head.next = tempNode.next
    this.updateNext(tempNode.id, head.id)//tempNode.next = head 
    this.updateHead(db, language_id, head.id)//head = tempValue (setHead)
  },
  // getNode(db, id) {
  //   return db
  //     .from('word')
  //     .select('id, next')
  //     .where({ id })
  //     .first() //{id: #, next: # or null}
  // },
  // getHead(db, id) {
  //   return db
  //     .from('language')
  //     .select('head', 'next')
  //     .where({ id })
  //     .first() //{head: #}
  // },
  updateHead(db, language_id, word_id) {
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
  }
}

//get all of the info
//

module.exports = LanguageService
