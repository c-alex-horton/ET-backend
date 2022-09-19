const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('./../db');
const jwtGenerator = require('../utils/jwtGenerator');
const validinfo = require('../middleware/validinfo');
const authorization = require('../middleware/authorization');

router.post("/register", validinfo, async (req, res) => {
    try {
        //1. destructure req.body
        const { name, email, password } = req.body;

        //2. check if user exists
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email
        ])

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists")
        }

        //3. Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password, salt)
        console.log(bcryptPassword);

        //4. enter user inside db
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]); 3

        //5. gen our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);



        res.json({ token, name })


    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// login route

router.post("/login", validinfo, async (req, res) => {
    try {

        //1. destructure
        const { email, password } = req.body;

        //2. check if user doesnt exist (throw err)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect")
        }

        //3. check if incoming pwd === db pwd
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }

        //4. give them jwt token
        const token = jwtGenerator(user.rows[0].user_id);

        // get username
        const name = user.rows[0].user_name;

        res.json({ token, name })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router