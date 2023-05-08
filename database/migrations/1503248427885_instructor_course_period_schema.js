'use strict'

const Schema = use('Schema')

class InstructorCoursePeriodSchema extends Schema {
    up() {
        this.create('instructor_course_periods', table => {
            table.increments()

            table.string('instructorcourseperiodid').notNullable().primary().unique()
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            table.string('periodid').notNullable().references('timetableid').inTable('timetables').onDelete('CASCADE')

            table.unique(['instructorcourseid', 'periodid']);
            
            table.timestamps()
        })
    }

    down() {
        this.drop('instructor_course_periods')
    }
}

module.exports = InstructorCoursePeriodSchema
