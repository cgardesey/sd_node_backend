'use strict'

const Schema = use('Schema')

class ChatSchema extends Schema {
    up() {
        this.create('chats', table => {
            table.increments()
            table.string('chatid').notNullable().primary().unique()
            table.string('tempid').nullable()
            table.string('text').nullable()
            table.string('link').nullable()
            table.string('linktitle').nullable()
            table.string('linkdescription').nullable()
            table.string('linkimage').nullable()
            table.string('attachmenturl').nullable()
            table.string('attachmenttype').nullable()
            table.string('attachmenttitle').nullable()
            table.boolean('readbyrecepient').defaultTo(false)
            table.string('instructorcourseid').nullable().references('instructorcourseid').inTable('instructor_courses').onDelete('.CASCADE')
            table.string('senderid').notNullable().references('userid').inTable('users').onDelete('.CASCADE')
            table.string('recepientid').nullable().references('userid').inTable('users').onDelete('.CASCADE')

            table.timestamps()
        })
    }

    down() {
        this.drop('chats')
    }
}

module.exports = ChatSchema
