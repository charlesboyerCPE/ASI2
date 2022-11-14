const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

app.post("/user/generateToken", async (req, res) => {
    console.log(req.body)
    return await axios.get(process.env.URL_MS_USER_GET, { login: req.body.login, password: req.body.password }).then(res => {
        if (res.data) {
            // Then generate JWT Token
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                username: req.body.login
            }

            const options = {
                expiresIn: process.env.JWT_EXPIRY,
                algorithm: 'HS256'
            }

            const token = jwt.sign(data, jwtSecretKey, options);
            res.send(token);
        } else {
            return res.status(401).send("Invalid credentials.");
        }
    }).catch(err => {
        console.log(err)
        return res.status(401).send("Invalid credentials.");
    })
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});