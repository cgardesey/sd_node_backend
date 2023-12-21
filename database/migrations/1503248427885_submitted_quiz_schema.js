'use strict'

const Schema = use('Schema')

class SubmittedQuizSchema extends Schema {
    up() {
        this.create('submitted_quizzes', table => {
            table.increments()

            table.string('submittedquizid').notNullable().primary().unique()
            table.string('title').nullable()
            table.string('url').nullable()
            table.integer('percentagescore').defaultTo(0)

            table.string('quizid').notNullable().references('quizid').inTable('quizzes').onDelete('CASCADE');
            table.string('studentid').notNullable().references('infoid').inTable('students').onDelete('CASCADE');

            table.timestamps()
        })
    }

    down() {
        this.drop('submitted_quizzes')
    }
}

module.exports = SubmittedQuizSchema
