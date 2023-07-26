const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "mynameisendtoend"
// SIGN UP PAGE
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })]

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let setPassword = await bcrypt.hash(req.body.password,salt)


        try {
            await User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location
                // name: "shyam Das",
                // password: "123456",
                // email: "shyam123@gmail.com",
                // location: "qwerty bharpur"
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

// LOGIN PAGE
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ error: " try loggint with correct credential" })
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)



            // if (req.body.password !== userData.password) {
                if(!pwdCompare){
                return res.status(400).json({ error: " try loggint with correct credential" })
            }

            const data ={
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)


            return res.json({ success: true,authToken:authToken })
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;