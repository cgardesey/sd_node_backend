'use strict'

const Schema = use('Schema')

class ClassSessionSchema extends Schema {
    up() {
        this.create('class_sessions', table => {
            table.increments()

            table.string('classsessionid').notNullable().primary().unique()
            table.string('sessionid').nullable()
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.string('title').nullable()
            table.string('description').nullable()
            table.string('docurl').nullable()
            table.string('dialcode').nullable()
            table.string('roomid').nullable()
            table.boolean('islive').defaultTo(false)

            table.timestamps()
        })
    }

    down() {
        this.drop('class_sessions')
    }
}

module.exports = ClassSessionSchema
