const conn = require("./connection")
//const pluralize = require('pluralize');
class Model {
    constructor(obj = {}) {
        this.setObjProp(obj)
    }

    setObjProp(obj){
        for (const key in obj) {
            this[key] = obj[key]
        }
    }

    static get tableName() {
        return this.name.toLowerCase()
    }

    async save(){
        try {
            let columns = Object.keys(this)
            let values = Object.values(this)
            console.log(columns);
            let sql = `INSERT INTO ${this.constructor.tableName} (${columns.join(', ')}) VALUES (${'?'.repeat(columns.length).split('').join(', ')})`
            let [result] = await conn.execute(sql, values)
            this.id = result.insertId
            return result.affectedRows > 0
        } catch (error) {
            console.log(error);
        }
    }

    static async fetch(filter={}) {
        let results = []
        let sql = `SELECT * FROM ${this.tableName}`
        if (Object.keys(filter).length > 0) {
            let i = 0;
            for (const prop in filter) {
                if(i == 0) sql += ` WHERE ${prop} = ?`
                else sql += ` AND ${prop} = ?`
                i++
            }
        }
        console.log(sql);
        let [rows] = await conn.execute(sql, Object.values(filter))
        for(let row of rows) {
            results.push(new this(row))
        }
        return results
    }

    static async findById(id){
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
        let [rows] = await conn.execute(sql, [id])
        if (rows.length > 0) {
            let row = rows[0]
            return new this(row)
        }
        return null
    } 

    async update(){
        let sql = `UPDATE ${this.constructor.tableName} SET `
        let {id, ...prop} = this;
        let columns = Object.keys(prop)
        let values = Object.values(prop)
        let i = 0;
        for (const column of columns) {
            sql += ` ${column} = ?${ i < columns.length -1 ? ',' : ''}`
            i++
        }
        sql += ` WHERE id = ${this.ID}`
       // console.log(sql, values);
        let [result] = await conn.execute(sql, values)
        return result.affectedRows > 0
    }

    static async delete(id){
        let sql = `DELETE from ${this.tableName} WHERE id = ?`
        let [result] = await conn.execute(sql, [id])
        return result.affectedRows > 0
    }
    
    async delete(){
        let sql = `DELETE from courses WHERE id = ?`
        console.log(sql);
        let [result] = await conn.execute(sql, [this.id])
        return result.affectedRows > 0
    }

    toString() {
        return this.name || 'No string representation of the object'
        } 
}

module.exports = Model