'use strict'

const Schema = use('Schema')

class EnrolmentRequestSchema extends Schema {
    up() {
        this.create('enrolment_requests', table => {
            table.increments()

            table.string('enrolmentrequestid').notNullable().primary().unique()
            table.string('studentid').nullable()
            table.string('instructorcourseid').nullable()
            table.boolean('approved').defaultTo(false);

            table.timestamps()
        })
    }

    down() {
        this.drop('enrolment_requests')
    }
}

module.exports = EnrolmentRequestSchema
