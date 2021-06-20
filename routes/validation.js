
//VALIDATION
const Joi = require('joi');

// Register Validation
const registerValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    //VALIDATE THE DATA BEFORE WE a USER
    return schema.validate(data)
    // res.send(validate)   
}

const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation