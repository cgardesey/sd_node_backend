'use strict'

const Schema = use('Schema')

class AssignmentSchema extends Schema {
    up() {
        this.create('assignments', table => {
            table.increments()

            table.string('assignmentid').notNullable().primary().unique()
            table.string('title').nullable()
            table.string('url').nullable()
            table.string('instructorcourseid').nullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.date('submitdate').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('assignments')
    }
}

module.exports = AssignmentSchema
