'use strict'

const Schema = use('Schema')

class InstructorCourseRatingSchema extends Schema {
    up() {
        this.create('instructor_course_ratings', table => {
            table.increments()

            table.string('instructorcourseratingid').notNullable().primary().unique()
            table.string('studentid').notNullable().references('infoid').inTable('students').onDelete('CASCADE')
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')

            table.unique(['studentid', 'instructorcourseid']);
            
            table.timestamps()
        })
    }

    down() {
        this.drop('instructor_course_ratings')
    }
}

module.exports = InstructorCourseRatingSchema
