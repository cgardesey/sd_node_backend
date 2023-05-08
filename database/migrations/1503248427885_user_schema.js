'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('userid').notNullable().primary().unique()
      table.string('phonenumber').nullable()
      table.string('username').nullable()
      table.string('email').notNullable().unique()
      table.timestamp('email_verified_at').nullable()
      table.string('confirmation_token').nullable()
      table.string('password').nullable()
      table.string('api_token').notNullable().unique()
      table.string('role').notNullable()
      table.integer('email_verified').defaultTo(0)
      table.boolean('active').defaultTo(true)
      table.boolean('connected').defaultTo(false)
      table.string('otp').nullable()
      table.string('apphash').nullable()
      table.string('osversion').nullable()
      table.string('sdkversion').nullable()
      table.string('device').nullable()
      table.string('devicemodel').nullable()
      table.string('deviceproduct').nullable()
      table.string('manufacturer').nullable()
      table.string('androidid').nullable()
      table.string('versionrelease').nullable()
      table.string('deviceheight').nullable()
      table.string('devicewidth').nullable()
      table.integer('timeremaining').defaultTo(0)

      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
