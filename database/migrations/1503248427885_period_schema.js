'use strict'

const Schema = use('Schema')

class PeriodSchema extends Schema {
    up() {
        this.create('periods', table => {
            table.increments()

            table.time('starttime').nullable()
            table.time('endtime').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('periods')
    }
}

module.exports = PeriodSchema
