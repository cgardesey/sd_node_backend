'use strict'

const Schema = use('Schema')

class AudioSchema extends Schema {
    up() {
        this.create('audios', table => {
            table.increments()

            table.string('audioid').notNullable().primary().unique()
            table.string('sessionid').nullable()
            table.string('title').nullable()
            table.string('url').nullable()
            table.string('audiourl').nullable()
            table.string('instructorcourseid').nullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')

            table.timestamps()
        })
    }

    down() {
        this.drop('audios')
    }
}

module.exports = AudioSchema
