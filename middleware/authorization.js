const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        //.1 Destructure token
        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).json("Not Authorized - JWT section")
        }

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)

        req.user = payload.user;

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(503).json("Not Authorized")
    }
}