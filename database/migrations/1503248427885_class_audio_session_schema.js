'use strict'

const Schema = use('Schema')

class ClassaudioSessionSchema extends Schema {
    up() {
        this.create('class_audio_sessions', table => {
            table.increments()

            table.string('classaudiosessionid').notNullable().primary().unique()
            table.string('sessionid').notNullable()
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.string('title').nullable()
            table.string('description').nullable()
            table.string('streamurl').nullable()
            table.string('docurl').nullable()
            table.boolean('chatlocked').defaultTo(true)

            table.timestamps()
        })
    }

    down() {
        this.drop('class_audio_sessions')
    }
}

module.exports = ClassaudioSessionSchema
