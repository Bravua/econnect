const Withdraw = require("../models/Withdraw");

const addWithdraw = (req, res) => {
    res.render('Withdraw');
}
 const saveWithdraw = async (req, res) => {
    let withdraw = new Withdraw(req.body)
    await withdraw.save()  
    console.log(withdraw); 
    res.redirect('/admin/withdraw');
}

const getWithdraw = async (req, res) => {
    let withdraw = await Withdraw.fetch()
    //res.render("withdraw", {withdraw})
    req.flash('success', 'Your payment will be approved if you are qualified ')
    res.redirect('back')
}

const withdrawDetail = async (req, res) => {
    let { id } = req.params
    let withdraw = await Persons.findById(id);
    console.log(withdraw);
    res.send(withdraw)
}

const updateWithdraw = async (req, res) => {
    let body = { username: 'Ajibola babatunde', pswd: 'nellyyo', r_acct_no: 000000, pswd:'nellyo123', r_bank_name:'diamond'}
    let withdraw = await Withdraw.findById(req.params.id)
    withdraw.setObjProp(body);
    if (await withdraw.update()) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}

const deleteWithdraw = async (req, res) => {
    if (await Withdraw.delete(req.params.id)) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}
module.exports = { addWithdraw, saveWithdraw, getWithdraw, withdrawDetail, updateWithdraw, deleteWithdraw}