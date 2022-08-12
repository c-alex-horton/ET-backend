const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        //.1 Destructure token
        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).json("Not Authorized")
        }

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)

        req.user = payload.user;

    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorized")
    }
}