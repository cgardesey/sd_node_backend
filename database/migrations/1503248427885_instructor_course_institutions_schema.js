'use strict'

const Schema = use('Schema')

class InstructorCourseInstitutionSchema extends Schema {
    up() {
        this.create('instructor_course_institutions', table => {
            table.increments()

            table.string('instructorcourseinstid').notNullable().primary().unique()
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.string('institutionid').notNullable().references('institutionid').inTable('institutions').onDelete('CASCADE')
            table.timestamps()
        })
    }

    down() {
        this.drop('instructor_course_institutions')
    }
}

module.exports = InstructorCourseInstitutionSchema
