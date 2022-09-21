const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (user_id, type = "jwt") => {
    const payload = {
        user: user_id
    }
    if (type === "refresh") {
        return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXP })
    } else if (type === "jwt") {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
    }
}

module.exports = jwtGenerator;