const router = require('express').Router()
const User = require('../model/User')
const {registerValidation, loginValidation} = require('./validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req,res) => {
    //VALIDATE THE DATA BEFORE WE a USER
    const validate = registerValidation(req.body)
    // console.log(validate)
    if(validate.error)return res.status(400).send(validate.error.details[0].message)

    //check if user is already in database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("Email Already Exist")

    // Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    
    try{
        const savedUser = await user.save()
        res.send({
            user: user._id 
        })
    }catch(err){
        console.log(err.message)
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res)=>{
    //VALIDATE THE DATA BEFORE WE a USER
    const validate = loginValidation(req.body)
    if(validate.error)return res.status(400).send(validate.error.details[0].message)

    //check if email exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Email or password is wrong")
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Invalid Password")

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

})


module.exports = router