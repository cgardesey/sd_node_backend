'use strict'

const Schema = use('Schema')

class PaymentSchema extends Schema {
    up() {
        this.create('payments', table => {
            table.increments()

            table.string('paymentid').notNullable().primary().unique()
            table.string('msisdn').nullable()
            table.string('countrycode').nullable()
            table.string('network').nullable()
            table.string('currency').nullable()
            table.decimal('amount', 8, 2).defaultTo(0)
            table.string('description').nullable()
            table.string('paymentref').nullable()
            table.string('message').nullable()
            table.string('responsemessage').nullable()
            table.date('expirydate').nullable()
            table.string('payerid').nullable().references('infoid').inTable('students').onDelete('CASCADE')
            table.string('enrolmentid').nullable().references('enrolmentid').inTable('enrolments').onDelete('CASCADE')
            
            table.timestamps()
        })
    }

    down() {
        this.drop('payments')
    }
}

module.exports = PaymentSchema
