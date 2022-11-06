const User = require("../controllers/User");
const conn = require("./connection");
const Models = require("./Models");

class Admin extends User {
    static async findByEmail(email){
        const sql = "SELECT * FROM admin WHERE ad_email = ?"
        let [result] = await conn.execute(sql, [email])
        if (result.length > 0) {
            let row  = result[0]
            return new this(row)
        }
        return null
    }
   
} 


module.exports = Admin