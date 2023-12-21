'use strict'

const Schema = use('Schema')

class StudentSchema extends Schema {
    up() {
        this.create('students', table => {
            table.increments()
            table.string('infoid').notNullable().primary().unique()
            table.string('confirmation_token')
            table.string('profilepicurl')
            table.string('title')
            table.string('firstname')
            table.string('lastname')
            table.string('othername')
            table.string('gender')
            table.string('emailaddress')
            table.string('dob')
            table.string('homeaddress')
            table.string('maritalstatus')
            table.string('primarycontact')
            table.string('auxiliarycontact')
            table.string('highestedulevel')
            table.string('highesteduinstitutionname')

            table.timestamps()
        })
    }

    down() {
        this.drop('students')
    }
}

module.exports = StudentSchema
