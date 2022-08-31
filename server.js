require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

// MIDDLEWARE
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cookieParser());

app.use(express.json()) //req.body
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))


// ROUTES

// register & login routes
app.use("/auth", require('./routes/jwtAuth'));

// Dashboard
app.use('/dashboard', require('./routes/dashboard'))

// Entries
app.use('/entries', require('./routes/entries'))

// app.get("/api/v1/posts", (req, res) => {

// })

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
