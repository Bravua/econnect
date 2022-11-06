const Plan = require("../models/Plan");

const addPlan = (req, res) => {
    res.render('Plan');
}
 const savePlan = async (req, res) => {
    let plan = new Plan(req.body)
    await plan.save()  
    console.log(plan); 
    res.redirect('/admin/plan');
}

const getPlan = async (req, res) => {
    let plan = await Plan.fetch()
    //res.render("pesons", {persons})
    res.send('done')
}

const planDetail = async (req, res) => {
    let { id } = req.params
    let plan = await Plan.findById(id);
    console.log(plan);
    res.send(plan)
}

const updatePlan = async (req, res) => {
    let body = { name: '', price: 300000, weeklyprofits: '',}
    let plan = await Plan.findById(req.params.id)
    plan.setObjProp(body);
    if (await plan.update()) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}

const deletePlan = async (req, res) => {
    if (await Plan.delete(req.params.id)) {
        res.redirect('back')
    } else {
        res.redirect('back')
    }
}
module.exports = { addPlan, getPlan, savePlan, planDetail, updatePlan, deletePlan}