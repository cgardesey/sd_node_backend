'use strict'

const Schema = use('Schema')

class AttendanceSchema extends Schema {
    up() {
        this.create('attendances', table => {
            table.increments()

            table.string('attendanceid').notNullable().primary().unique()
            table.string('sessionid').nullable()
            table.string('audioid').nullable()
            table.string('type').nullable()
            table.integer('duration').defaultTo(0)

            table.string('studentid').notNullable().references('infoid').inTable('students').onDelete('CASCADE');


            table.timestamps()
        })
    }

    down() {
        this.drop('attendances')
    }
}

module.exports = AttendanceSchema
