const Payment = require("../models/Payment");
const { resolve } = require('path');
const Persons = require("../models/Persons");

const addPayment = (req, res) => {
    res.render('Payment');
}
const savePayment = async (req, res) => {
    if (req.session.person == undefined) {
        req.flash('info', 'You need to login first')
        return res.redirect('back')
    }
    let payment = new Payment(req.body)
    payment.person_id = req.session.person.ID
    await payment.save()
    let person = await Persons.findById(req.session.person.ID)
    person.payment_id = payment.id
    await person.update()
    res.redirect('/admin/payment');


    

  await payment.save()
 req.flash('danger', 'invalid');
}

const getPayment = async (req, res) => {
    let payment = await Payment.fetch()
    //res.render("payment", {payment})
    //res.redirect( 'back')
    if (payment) {
        req.flash('success', 'your payment will be approved within 24hrs')
        res.redirect('back')
    } else {
        req.flash('danger', 'invalid details')
    }
}

const paymentDetail = async (req, res) => {
    let { id } = req.params
    let payment = await Persons.findById(id);
    console.log(payment);
    res.send(payment)
}

const updatePayment = async (req, res) => {
    let body = { amount: 100000, b_bank: 'Kuda bank', p_type: 'online banking', s_bank: 'Union bank', name: 'bad boy timz', acct_no: 0000000000, date: '0000-00-00', proof: '' }
    let payment = await Payment.findById(req.params.id)
    payment.setObjProp(body);
    if (await payment.update()) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}

const deletePayment = async (req, res) => {
    if (await Payment.delete(req.params.id)) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}
module.exports = { addPayment, savePayment, getPayment, paymentDetail, updatePayment, deletePayment }