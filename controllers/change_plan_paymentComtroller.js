const Change_plan_payment = require("../models/change_plan_payment");

const addChange_plan_payment = (req, res) => {
    res.render('Persons');
}
 const saveChange_plan_payment = async (req, res) => {
    let change_plan_payment = new Change_plan_payment(req.body)
    await change_plan_payment.save()  
    console.log(change_plan_payment); 
    res.redirect('/admin/change_plan_payment');
}

const getChange_plan_payment = async (req, res) => {
    let change_plan_payment = await Change_plan_payment.fetch()
    //res.render("change_plan_payment", {change_plan_payment})
    //res.send('your payment will be approved and your plan upgraded within 24 hrs')
    req.flash('success', 'Your plan will be changed, once your payment is approved')
    res.redirect('back')
}

const change_plan_paymentDetail = async (req, res) => {
    let { id } = req.params
    let change_plan_payment = await Change_plan_payment.findById(id);
    console.log(change_plan_payment);
    res.send(change_plan_payment)
}

const updateChange_plan_payment = async (req, res) => {
    let body = { username: 'Ajibola babatunde', plan: 'silver', p_type: 'transfer', s_bank:'union bank', date:'0000-00-00', proof:''}
    let change_plan_payment = await Change_plan_payment.findById(req.params.id)
    change_plan_payment.setObjProp(body);
    if (await change_plan_payment.update()) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}

const deleteChange_plan_payment = async (req, res) => {
    if (await Change_plan_payment.delete(req.params.id)) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}
module.exports = {addChange_plan_payment, saveChange_plan_payment, getChange_plan_payment, change_plan_paymentDetail, updateChange_plan_payment, deleteChange_plan_payment, addChange_plan_payment, saveChange_plan_payment, getChange_plan_payment, change_plan_paymentDetail, updateChange_plan_payment, deleteChange_plan_payment}