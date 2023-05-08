'use strict'

const Schema = use('Schema')

class SubmittedAssignmentSchema extends Schema {
    up() {
        this.create('submitted_assignments', table => {
            table.increments()

            table.string('submittedassignmentid').notNullable().primary().unique()
            table.string('title').nullable()
            table.string('url').nullable()
            table.integer('percentagescore').defaultTo(0)

            table.string('assignmentid').notNullable().references('assignmentid').inTable('assignments').onDelete('CASCADE');
            table.string('studentid').notNullable().references('infoid').inTable('students').onDelete('CASCADE');

            table.timestamps()
        })
    }

    down() {
        this.drop('submitted_assignments')
    }
}

module.exports = SubmittedAssignmentSchema
