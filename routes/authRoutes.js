const express = require('express');
const router = express.Router();
const { createUser } = require('../utils/auth/createUser');
const { authenticateUser } = require('../utils/auth/authenticateUser');


// login to existing account route
router.post('/login' , async(req , res) => {
    try {
        let {username , password } = req.body;
        username = username.trim();
        password = password.trim();

        if(!(username&& password)){
            throw Error("Empty input fields");
        }

        const authenticatedUser = await authenticateUser({username , password});

        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).json(error.message);    
    }
});

// register new account route
router.post('/signup' , async (req , res) => {
    try{
        let {username , email , password } = req.body;
        username = username.trim();
        email = email.trim();
        password = password.trim();

        // throws error if any field is empty
        if(!(username && email && password)){
            throw Error("Empty input fields");
        } 
        // throws error if the length of password is less than 8
        else if (password.length < 8){
            throw Error("Password is too short"); 
        } 
        // validates mail address provided with regex and sends error otherwise
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw Error("Invalid email");
        } 
        // if the credentials are good then create a new user
        else {
           const newUser = await createUser({
            username,
            email,
            password
           })
           res.status(200).json(newUser);
        }
    } catch(err){
        res.status(400).json(err.message)
    }
});


module.exports = router;