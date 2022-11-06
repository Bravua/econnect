// const User = require("../controllers/User");
const conn = require("./connection");
const Models = require("./Models");

class Payment extends Models {
    static async findByPersonId(person_id) {
        let results = []
        let sql = `SELECT * FROM ${this.tableName} WHERE person_id = ?`
        // if (Object.keys(filter).length > 0) {
        //     let i = 0;
        //     for (const prop in filter) {
        //         if(i == 0) sql += ` WHERE ${prop} = ?`
        //         else sql += ` AND ${prop} = ?`
        //         i++
        //     }
        // }
        // console.log(sql);
        let [rows] = await conn.execute(sql, [person_id])
        for(let row of rows) {
            results.push(new this(row))
        }
        return results
    }
    // static async findByPersonId(person_id){
    //     const sql = "SELECT * FROM payment WHERE person_id = ?"
    //     let [result] = await conn.execute(sql, [person_id])
    //     if (result.length > 0) {
    //         let row  = result[0]
    //         // if (pwd == admin.password) return admin
    //         // if (await bcrypt.compare(pswd, persons.password)) return admin
    //         return new this(row)
    //     }
    //     return null
    // }
}

module.exports = Payment