import express, { Response, Request } from 'express'
import cors from 'cors'
require('dotenv').config()
import {PrismaClient} from '@prisma/client'
import entry from './routes/entry'

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT

app.use('/', entry)

const server = app.listen(PORT, ()=> {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})