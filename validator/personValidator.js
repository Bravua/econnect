const { body } = require('express-validator');
const checkValidationErrors = require('../middlewares/checkValidationErrors');
const personValidator = [
    body('firstname').not().isEmpty().escape().withMessage('firstname is required and must all be letters'),
    body('lastname').not().isEmpty().escape().withMessage('lastname is required and must all be letters'),
    body('email').escape(),
    body('pswd').escape(),
    body('plan').not().isEmpty().isIn(['bronze', 'silver', 'gold', 'Platinum']).withMessage('select from the plans above'),
    body('gender').not().isEmpty(),
    checkValidationErrors
];

module.exports = personValidator