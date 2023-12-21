'use strict'

const Schema = use('Schema')

class QuizSchema extends Schema {
    up() {
        this.create('quizzes', table => {
            table.increments()

            table.string('quizid').notNullable().primary().unique()
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.string('title').nullable()
            table.string('description').nullable()
            table.time('starttime').nullable()
            table.time('endtime').nullable()
            table.date('date').nullable()
            table.string('url').nullable()
            table.string('question').nullable()
            table.boolean('active').defaultTo(true)

            table.timestamps()
        })
    }

    down() {
        this.drop('quizzes')
    }
}

module.exports = QuizSchema
