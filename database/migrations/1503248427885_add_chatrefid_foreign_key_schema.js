'use strict'

const Schema = use('Schema')

class AddChatrefidForeignKeySchema extends Schema {
    up() {
        this.table('chats', table => {
            table.string('chatrefid').nullable().references('chatid').inTable('chats').onDelete('CASCADE')
        })
    }

    down() {
        
    }
}

module.exports = AddChatrefidForeignKeySchema
