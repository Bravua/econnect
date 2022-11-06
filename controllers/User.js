const Model = require("../models/Models");

class User extends Model {
    get name(){
        return `${this.firstname} ${this.lastname}`
    }

   // get age() {
       // return Math.floor(((new Date()) - this.dob)/(1000 * 60 * 60 * 24 * 365.25))
    //}

}

module.exports = User