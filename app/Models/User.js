'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to bash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'User.hashPassword')
  }

    static get primaryKey () {
        return 'userid'
    }

    static get incrementing () {
        return false
    }

    static get hidden () {
        return ['password']
    }

    static get createdAtColumn () {
        return 'created_at'
    }

    static get updatedAtColumn () {
        return 'updated_at'
    }

    /*static get dates () {
        return super.dates.concat(['email_verified_at'])
    }*/

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

    student () {
        return this.hasOne('App/Models/Student', 'userid', 'infoid')
    }
}

module.exports = User
