const router = require('express').Router()
const verify = require('./verifyToken')


router.get('/', verify ,(req,res)=>{
    res.json({
            posts: {
                title: "My first posts", 
                description : 'random data you souldnt access'
            }
        }
    )
})

module.exports = router