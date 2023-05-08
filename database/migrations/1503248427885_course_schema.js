'use strict'

const Schema = use('Schema')

class CourseSchema extends Schema {
    up() {
        this.create('courses', table => {
            table.increments()

            table.string('courseid').notNullable().primary().unique()
            table.string('imageurl').nullable()
            table.string('coursecode').nullable()
            table.string('coursepath').nullable()
            table.string('description').nullable()
            table.string('about').nullable()
            table.boolean('active').defaultTo(true)

            table.timestamps()
        })
    }

    down() {
        this.drop('courses')
    }
}

module.exports = CourseSchema
