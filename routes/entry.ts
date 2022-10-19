import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const router = express.Router()

router.get('/entry',async (req:Request, res:Response) => {
    res.json('Get from Entries!')
})

router.post('/entry',async (req:Request, res:Response) => {
    res.json('Post from Entries!')
})

router.put('/entry',async (req:Request, res:Response) => {
    res.json('Put from Entries!')
})

router.delete('/entry',async (req:Request, res:Response) => {
    res.json('Delete from Entries!')
})

export default router