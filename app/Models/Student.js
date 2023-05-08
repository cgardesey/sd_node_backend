'use strict'

const Model = use('Model')

class Student extends Model {
    static boot () {
        super.boot()
    }

    static get primaryKey () {
        return 'infoid'
    }

    static get incrementing () {
        return false
    }

    static get createdAtColumn () {
        return 'created_at'
    }

    static get updatedAtColumn () {
        return 'updated_at'
    }

    user () {
        return this.hasOne('App/Models/User', 'infoid', userid)
    }
}

module.exports = Student
