'use strict'

const Schema = use('Schema')

class InstructorCourseSchema extends Schema {
    up() {
        this.create('instructor_courses', table => {
            table.increments()

            table.string('instructorcourseid').notNullable().primary().unique()
            table.string('livestreamurl').nullable()
            table.string('currency').nullable()
            table.decimal('price', 8, 2).defaultTo(0)

            table.string('instructorid').notNullable().references('infoid').inTable('instructors').onDelete('CASCADE');
            table.string('courseid').notNullable().references('courseid').inTable('courses').onDelete('CASCADE');
            table.string('institutionid').nullable().references('institutionid').inTable('institutions').onDelete('CASCADE');

            table.unique(['instructorid', 'courseid'])

            table.timestamps()
        })
    }

    down() {
        this.drop('instructor_courses')
    }
}

module.exports = InstructorCourseSchema
