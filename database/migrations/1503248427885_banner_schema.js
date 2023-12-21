'use strict'

const Schema = use('Schema')

class BannerSchema extends Schema {
    up() {
        this.create('banners', table => {
            table.increments()

            table.string('bannerid').notNullable().primary().unique()
            table.string('url').nullable()
            table.string('criteria').nullable()
            table.decimal('cost', 8, 2).defaultTo(0)
            table.date('expirydate').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('banners')
    }
}

module.exports = BannerSchema
