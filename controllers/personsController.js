const Persons = require("../models/Persons");
const {generate, verify} = require('password-hash')


const addPersons = (req, res) => {
    res.render('Persons');
}
 const savePersons = async (req, res) => {
    let persons = new Persons(req.body)
    persons.pswd = generate(req.body.pswd)
    await persons.save()  
    console.log(persons); 
    res.redirect('/admin/persons');
}

const getPersons = async (req, res) => {
    let persons = await Persons.fetch()
    //res.render("pesons", {persons})
    if (persons) {
        req.flash("success","Success! Login to your personal area")
        res.redirect('/login')
    } else {
       req.flash("danger", "invalid details") 
    }
}

const personsDetail = async (req, res) => {
    let { id } = req.params
    let persons = await Persons.findById(id);
    console.log(persons);
    res.send(persons)
}

const updatePersons = async (req, res) => {
    let body = { firstname: 'Ajibola', lastname: 'babatnde', email: 'anthonyaibola1@gmail.com', pswd:'nellyo123', plan:'silver', gender:'male', txt:'friends'}
    let persons = await Persons.findById(req.params.id)
    persons.setObjProp(body);
    if (await persons.update()) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}

const deletePersons = async (req, res) => {
    if (await Persons.delete(req.params.id)) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}
module.exports = { addPersons, getPersons, savePersons, personsDetail, updatePersons, deletePersons}