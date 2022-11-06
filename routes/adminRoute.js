const {generate, verify} = require('password-hash')
const { Router } = require('express');
const { resolve } = require('path');
const Persons = require('../models/Persons');
const Payment = require('../models/payment')
const Withdraw = require('../models/withdraw')
const Change_plan_payment = require('../models/change_plan_payment')
const { addPayment, savePayment, getPayment, updatePayment, deletePayment, paymentDetail } = require('../controllers/paymentController');
const { addWithdraw, saveWithdraw, getWithdraw, withdrawDetail, updateWithdraw, deleteWithdraw } = require('../controllers/withdrawController');
const { addChange_plan_payment, saveChange_plan_payment, getChange_plan_payment, change_plan_paymentDetail, updateChange_plan_payment, deleteChange_plan_payment } = require('../controllers/change_plan_paymentComtroller');
const { addPlan, savePlan, planDetail, getPlan, updatePlan, deletePlan } = require('../controllers/planController');

let router = Router()




const {body, validationResult} = require('express-validator');
const checkValidationErrors = require('../middlewares/checkValidationErrors');


//payment route
router.get('/add-payment', addPayment)
router.post('/add-payment', savePayment);
router.get('/payment', getPayment);
router.get('/payment/:id', paymentDetail);
router.get('/payment/:id/update', updatePayment)
router.get('/payment/:id/delete', deletePayment)

//withdraw route
router.get('/add-withdraw', addWithdraw)
router.post('/add-Withdraw', saveWithdraw);
router.get('/withdraw', getWithdraw);
router.get('/withdraw/:id', withdrawDetail);
router.get('/withdraw/:id/update', updateWithdraw)
router.get('/withdraw/:id/delete', deleteWithdraw)


//change_plan_payment route
router.get('/add-change_plan_payment', addChange_plan_payment)
router.post('/add-change_plan_payment', saveChange_plan_payment);
router.get('/change_plan_payment', getChange_plan_payment);
router.get('/change_plan_payment/:id', change_plan_paymentDetail);
router.get('/change_plan_payment/:id/update', updateChange_plan_payment)
router.get('/change_plan_payment/:id/delete', deleteChange_plan_payment)


//plan route
router.get('/add-plan', addPlan)
router.post('/add-plan', savePlan);
router.get('/plan', getPlan);
router.get('/plan/:id', planDetail);
router.get('/plan/:id/update', updatePlan)
router.get('/plan/:id/delete', deletePlan)


router.get('/clients/', async (req, res) => {
    let persons = await Persons.fetch()
    var payment = {}
    for (const person of persons) {
        person.payment = await Payment.findById(person.payment_id)
         var checkPayment = await Payment.findByPersonId(person.ID)
        // console.log(payment[0]);
         payment[person.ID] = checkPayment[0]
    }
    // for (const payments of checkPayment) {
    //      var payment = payments
    //     console.log(checkpayment);
    // }
    // return
    res.render('new-persons', {persons, payment})
})
router.get('/accept-payment/:payment_id/:person_id', async (req, res) => {
    // console.log(req.params.payment_id, req.params.person_id);return
    let person = await Persons.updatePayment(req.params.payment_id, req.params.person_id)
    res.redirect('/admin/clients')

})

router.get('/undo-payment/:person_id', async (req, res) => {
    // console.log(req.params.payment_id, req.params.person_id);return
    let person = await Persons.updatePayment(null, req.params.person_id)
    res.redirect('/admin/clients')

})





module.exports = router;