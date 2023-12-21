'use strict'

const Schema = use('Schema')

class EnrolmentSchema extends Schema {
    up() {
        this.create('enrolments', table => {
            table.increments()

            table.string('enrolmentid').notNullable().primary().unique()
            table.string('studentid').notNullable().references('infoid').inTable('students').onDelete('CASCADE')
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.boolean('enrolled').defaultTo(true)
            table.integer('percentagecompleted').defaultTo(0)

            table.unique(['studentid', 'instructorcourseid'])

            table.timestamps()
        })
    }

    down() {
        this.drop('enrolments')
    }
}

module.exports = EnrolmentSchema
