'use strict'

const Schema = use('Schema')

class RecordedAudioStreamSchema extends Schema {
    up() {
        this.create('recorded_audio_streams', table => {
            table.increments()

            table.string('recordedaudiostreamid').notNullable().primary().unique()
            table.string('sessionid').notNullable()
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.string('title').nullable()
            table.string('description').nullable()
            table.string('docurl').nullable()
            table.string('url').nullable()
            table.string('giflink').nullable()
            table.string('thumbnail').nullable()
            table.boolean('active').defaultTo(false)

            table.timestamps()
        })
    }

    down() {
        this.drop('recorded_audio_streams')
    }
}

module.exports = RecordedAudioStreamSchema
