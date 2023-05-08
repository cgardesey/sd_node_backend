'use strict'

const Schema = use('Schema')

class InstructorSchema extends Schema {
    up() {
        this.create('Instructors', table => {
            table.increments()
            table.string('infoid').notNullable().primary().unique()
            table.string('confirmation_token').nullable()
            table.string('profilepicurl').nullable()
            table.string('title').nullable()
            table.string('firstname').nullable()
            table.string('lastname').nullable()
            table.string('othername').nullable()
            table.string('gender').nullable()
            table.string('emailaddress').nullable()
            table.string('dob').nullable()
            table.string('homeaddress').nullable()
            table.string('maritalstatus').nullable()
            table.string('primarycontact').nullable()
            table.string('auxiliarycontact').nullable()
            table.string('edubackground').nullable()
            table.string('about').nullable()
            table.string('momo_number').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('Instructors')
    }
}

module.exports = InstructorSchema
