const User = require("../controllers/User");
const conn = require("./connection");
const Models = require("./Models");

class Persons extends User {
    static async findByEmail(email){
        const sql = "SELECT * FROM persons WHERE email = ?"
        let [result] = await conn.execute(sql, [email])
        if (result.length > 0) {
            let row  = result[0]
            // if (pwd == admin.password) return admin
            // if (await bcrypt.compare(pswd, persons.password)) return admin
            return new this(row)
        }

        return null
    }
    static async findByToken(token){
        const sql = "SELECT * FROM persons WHERE token = ?"
        let [result] = await conn.execute(sql, [token])
        if (result.length > 0) {
            let row  = result[0]
            // if (pwd == admin.password) return admin
            // if (await bcrypt.compare(pswd, persons.password)) return admin
            return new this(row)
        }
        return null
    }
    static async updatePayment(payment_id, person_id){
        let sql = `UPDATE persons SET payment_id= ? WHERE id = ?`
        let [result] = await conn.execute(sql, [payment_id, person_id])
        return result.affectedRows > 0
    }
     async updatePassword(token, pswd){
        let sql = `UPDATE persons SET token = ?, pswd = ? WHERE token = ?`
        let [result] = await conn.execute(sql, [token, pswd, token])
        return result.affectedRows > 0
    }
   
} 


module.exports = Persons