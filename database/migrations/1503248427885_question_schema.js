'use strict'

const Schema = use('Schema')

class QuestionSchema extends Schema {
    up() {
        this.create('questions', table => {
            table.increments()

            table.string('questionid').notNullable().primary().unique()
            table.string('quizid').notNullable().references('quizid').inTable('quizzes').onDelete('CASCADE')
            table.string('url').nullable()
            table.text('question').nullable()
            table.string('correctans').nullable()
            table.string('optiona').nullable()
            table.string('optionb').nullable()
            table.string('optionc').nullable()
            table.string('optiond').nullable()
            table.string('optione').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('questions')
    }
}

module.exports = QuestionSchema
