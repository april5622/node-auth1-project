const express = require("express")
const bcrypt = require("bcryptjs")
const users = require("../users/users-model")
//const {restrict} = require("../middleware/restrict")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const {username} = req.body
        const user = await users.findBy({username}).first()

        if(user){
            return res.status(409).json({
                message: "username already taken"
            })
        }
        res.status(201).json(await users.add(req.body))
    }catch(err){
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body 
        const user = await users.findBy({username}).first()
        const passwordValid = await bcrypt.compare(password, user.password)
        
        if(!user || !passwordValid) {
            return res.status(401).json({
                message: "You shall not pass!"
            })
        }
        res.session.user = user

        res.json({
            message: "Logged in"
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router 
