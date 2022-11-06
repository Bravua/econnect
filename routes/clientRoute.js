let {Router} = require('express')
const { readFileSync } = require('fs')
const {resolve} = require('path')
const Persons = require('../models/Persons')
const Plan = require('../models/Plan')
const payment = require('../models/payment')
const Payment = require('../models/payment')
const router = require('./adminRoute')
const User = require('../controllers/User')
const { addPersons, savePersons, getPersons, personsDetail, updatePersons, deletePersons } = require('../controllers/personsController');
const {generate, verify} = require('password-hash')
const Admin = require('../models/admin')
const sendEmail = require("../models/forgetPassword");
var randtoken = require("rand-token")
let route = Router()
const conn = require("../models/connection");

const {body, validationResult} = require('express-validator');
const checkValidationErrors = require('../middlewares/checkValidationErrors');

const personValidator = require('../validator/personValidator');

//Persons route
router.get('/add-persons', addPersons)
router.post('/add-persons',personValidator, savePersons);
router.get('/persons', getPersons)
router.get('/persons/:id', personsDetail)
router.get('/persons/:id/update', updatePersons)
router.get('/pesons/:id/delete', deletePersons)

route.get('/', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('index' , {plans})
})

route.get('/personal-area/', async (req, res) => {
    let plans = await Plan.fetch()
    let person_id = req?.session?.person?.ID
    if (!person_id) {
        return res.redirect('/')
    }
    let person = await Persons.findById(person_id)
    res.render('personal-area' , {plans, person})
})


route.get('/careers', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('careers', {plans})
})
route.get('/signup', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('signup', {plans})
})
route.get('/login', async (req, res) => {
    res.render('login',)
})

route.get('/ecommerce', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('ecommerce', {plans})
})

route.get('/about', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('about', {plans})
})

route.get('/referral', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('referral', {plans})
})

route.get('/weeklyp', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('weeklyp', {plans})
})

route.get('/withdraw', async (req, res) => {
    let plans = await Plan.fetch()
    let person_id = req?.session?.person?.ID
    if (!person_id) {
        return res.redirect('/')
    }
    let person = await Persons.findById(person_id)
    res.render('withdraw', {plans, person})
})

route.get('/change-plan', async (req, res) => {
    let plans = await Plan.fetch()
    let person_id = req?.session?.person?.ID
    if (!person_id) {
        return res.redirect('/')
    }
    let person = await Persons.findById(person_id)
    res.render('change-plan', {plans, person})
})

route.get('/change-payment', async (req, res) => {
    let plans = await Plan.fetch()
    res.render('change-payment', {plans})
})

route.get('/payment', async (req, res) => {
    //let plans = await Plan.fetch()
    let person_id = req?.session?.person?.ID
    if (!person_id) {
        return res.redirect('/')
    }
    let person = await Persons.findById(person_id)
    res.render('payment', {person})
})

route.get('/forget-password', async (req, res) => {
    //let plans = await Plan.fetch()
    res.render('forget-password')
})

route.post('/forget-password', async(req, res) =>{
    var email = req.body.email;
let person = await Persons.findByEmail(email);
if (person == null) {
  req.flash("danger", "No registered account with this email");
  return res.redirect("back");
}
var name = person.firstname
const token = randtoken.generate(30);
var sent = sendEmail(email, token, name);
if (sent != '0') {
  person.token = token;
  await person.update();
  req.flash("success", "Reset link has been sent to your email address");
  res.redirect("/forget-password");
} else {
  req.flash("danger", "Something goes Wrong. Please try again")
}
})

route.get('/reset-password/:token', async (req, res) => {
    res.render('reset-password')
})


    //post reset password
route.post('/reset-password/:token',  async (req, res) => {
    let { confirm_password, ...otherFields } = req.body;
    let person = await Persons.findByToken(req.params.token);
    //var data = {
      var token= null
      var pswd= generate(req.body.pswd)
      console.log(token, pswd, req.params.token) 
      await person.updatePassword(token, pswd, req.params.token)
    //}
    //conn.execute('UPDATE persons SET ? WHERE token ="' + req.params.token + '"', [data], function (err, result) {
     // if (err) throw err
     // if (result > 0) {
  
        //console.log(result)
     // }
   // })
    req.flash('success', 'Your password has been updated successfully')
    res.redirect('/')
  });


route.post('/login', async (req, res) => {
    let person = await Persons.findByEmail(req.body.email)
    // console.log(person);return
    if (!person) { 
        req.flash('danger', 'user not found')
        return res.redirect('/')
    }
    if (person.payment_id === null && verify(req.body.pswd, person.pswd)) {
        req.flash('info', 'please make your payment')
        req.session.person = person;
        return res.redirect('/payment')
    }else if (person.payment_id !== null && verify(req.body.pswd, person.pswd)){
        req.flash('success', 'welcome '+ person.firstname)
        req.session.person = person;
        return res.redirect('/personal-area')
        // res.send('2')
    }else{
        req.flash('danger', 'invalid email or password')
        return res.redirect('back')
    }
})
route.post('/admin/login', async (req, res) => {
    let admin = await Admin.findByEmail(req.body.ad_email)
    if (admin && verify(req.body.ad_pswd, admin.ad_pswd)) {
        req.session.admin = admin;
        return res.redirect('/admin/clients/')

    }else{
       // res.send('0')
       req.flash('danger', 'you are not an admin')
        return res.redirect('back')
    }
})


module.exports = route