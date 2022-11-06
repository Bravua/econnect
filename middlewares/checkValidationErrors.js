const { validationResult } = require('express-validator');
const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    } else {
        req.session.formBody = req.body
        req.session.formErrors = errors.mapped()
        console.log(req.session.formErrors);
        req.flash('danger', "There are errors in your form")
        res.redirect('back')
    }
} 

module.exports = checkValidationErrors