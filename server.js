require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARE

app.use(express.json()) //req.body
app.use(cors())

// ROUTES

// register & login routes
app.use("/auth", require('./routes/jwtAuth'));

// Dashboard
app.use('/dashboard', require('./routes/dashboard'))

// app.get("/api/v1/posts", (req, res) => {

// })

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
