'use strict'

const Schema = use('Schema')

class RecordedVideoSchema extends Schema {
    up() {
        this.create('recorded_videos', table => {
            table.increments()

            table.string('videoid').notNullable().primary().unique()
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.string('title').nullable()
            table.string('description').nullable()
            table.string('url').nullable()
            table.string('giflink').nullable()
            table.string('thumbnail').nullable()
            table.boolean('active').defaultTo(false)

            table.timestamps()
        })
    }

    down() {
        this.drop('recorded_videos')
    }
}

module.exports = RecordedVideoSchema
