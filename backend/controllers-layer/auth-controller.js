const express = require("express");

const authLogic = require("../business-logic-layer/auth-logic");
const CredentialsLogin = require("../model/credentials-login");
const User = require("../model/user");

const router = express.Router();

// Login: 
router.post("/login", async (request, response) => {
    try {
        // Get user credentials: 
        const credentials = new CredentialsLogin(request.body);

        // Validate credentials: 
        const errors = credentials.validate();
        if (errors) return response.status(400).send(errors);

        // BL: 
        const loggedInUser = await authLogic.loginAsync(credentials);

        // Success: 
        response.send(loggedInUser);
    }
    catch (err) {
        if (err.isError) {
            response.status(err.status).send(err.message);
        }
        else {
        console.log(err);
        response.status(500).send({message: "Server error"});
    }}
});

router.post("/register", async (request, response) => {
    try {
        // Get user user: 
        const user = new User(request.body);

        // Validate user:  
        const errors = user.validate();
        if (errors) return response.status(400).send(errors);

        // BL: 
        const registeredInUser = await authLogic.registerAsync(user);

        // Success: 
        response.status(201).send(registeredInUser);
    }
    catch (err) {
        console.log(err);
        if (err.isEmailError) {
            response.status(err.status).send(err.message);
        }
        else {
        response.status(500).send({message: "Server error"});
        }
    }
});

module.exports = router;