'use strict'

const Schema = use('Schema')

class InstitutionSchema extends Schema {
    up() {
        this.create('institutions', table => {
            table.increments()
            table.string('institutionid').notNullable().primary().unique()
            table.string('name').nullable()
            table.string('level').nullable()
            table.string('address').nullable()
            table.string('location').nullable()
            table.string('contact').nullable()
            table.string('website').nullable()
            table.string('logourl').nullable()
            table.string('dateregistered').nullable()
            table.string('userid').nullable()
            table.boolean('active').defaultTo(true)


            table.timestamps()
        })
    }

    down() {
        this.drop('institutions')
    }
}

module.exports = InstitutionSchema
