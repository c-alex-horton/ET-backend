import { PrismaClient } from "@prisma/client";
import express, {Request, Response} from "express";

const prisma =new PrismaClient()

const router = express.Router()


router.post('/login',async (req:Request, res:Response) => {
    res.json('Post from Entries!')
})

router.post('/logout',async (req:Request, res:Response) => {
    res.json('Placeholde for /logout')
})

router.post('/register',async (req:Request, res:Response) => {
    try {
        const {username, firstname, lastname, email, password} = req.body
        const newUser = await prisma.user.create({
            data: {
                username: username,
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password
            }
        })
        res.status(201).json('User Registered!')
    } catch (err) {
        console.log(err)
        res.status(500).json('Something went wrong.')
    }
})

router.delete('/delete-account',async (req:Request, res:Response) => {
    res.json('Placeholde for /delete-account')
})


export default router