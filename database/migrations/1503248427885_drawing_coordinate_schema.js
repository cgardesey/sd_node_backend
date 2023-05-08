'use strict'

const Schema = use('Schema')

class DrawingCoordinateSchema extends Schema {
    up() {
        this.create('drawing_coordinates', table => {
            table.increments()

            table.string('coordinatesid').notNullable().primary().unique()
            table.string('classsessionid').nullable()
            table.string('instructorcourseid').notNullable()
            table.string('x0').nullable()
            table.string('x1').nullable()
            table.string('y0').nullable()
            table.string('y1').nullable()
            table.string('color').nullable()
            table.string('strokeWidth').nullable()
            table.string('sessionId').nullable()
            table.string('clearpage').nullable()
            table.string('background').nullable()

            table.timestamps()
        })
    }

    down() {
        this.drop('drawing_coordinates')
    }
}

module.exports = DrawingCoordinateSchema
