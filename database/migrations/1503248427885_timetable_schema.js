'use strict'

const Schema = use('Schema')

class TimetableSchema extends Schema {
    up() {
        this.create('timetables', table => {
            table.increments()

            table.string('timetableid').notNullable().primary().unique()
            table.string('dow').notNullable()
            $table.unsigned('period_id').notNullable().references('id').inTable('periods').onDelete('CASCADE')
            table.string('instructorcourseid').notNullable().references('instructorcourseid').inTable('instructor_courses').onDelete('CASCADE')
            
            table.unique(['instructorcourseid', 'dow', 'period_id'])

            table.timestamps()
        })
    }

    down() {
        this.drop('timetables')
    }
}

module.exports = TimetableSchema
