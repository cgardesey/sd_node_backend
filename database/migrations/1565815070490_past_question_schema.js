'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PastQuestionSchema extends Schema {
    up() {
        this.create('past_questions', (table) => {
            table.increments()

            table.string('questionid').notNullable()
            table.string('question').nullable()
            table.longText('picture')
            table.string('videopath').nullable()
            table.string('answer').nullable()
            table.boolean('isfirstquestion').defaultTo(false)
            table.boolean('islastquestion').defaultTo(false)
            table.boolean('ismcq').defaultTo(false)
            table.boolean('isfirstmcq').defaultTo(false)
            table.boolean('islastmcq').defaultTo(false)
            table.boolean('isendofquestion').defaultTo(false)

            table.timestamps()
        })
    }

    down() {
        this.drop('past_questions')
    }
}

module.exports = PastQuestionSchema
