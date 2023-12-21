'use strict'

const Schema = use('Schema')

class ProprietorSchema extends Schema {
    up() {
        this.create('proprietors', table => {
            table.increments()

            table.string('userid').notNullable().primary().unique()
            table.string('phonenumber').notNullable().unique()
            table.string('email').nullable()
            table.timestamp('email_verified_at').nullable()
            table.string('confirmation_token').nullable()
            table.string('password').nullable()
            table.string('api_token').notNullable().unique()
            table.string('role').notNullable()
            table.integer('email_verified').defaultTo(0)
            table.boolean('active').defaultTo(true)
            table.boolean('connected').defaultTo(false)
            table.string('otp').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('proprietors')
    }
}

module.exports = ProprietorSchema
