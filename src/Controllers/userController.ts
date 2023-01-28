import { Request, Response } from "express";
import { UserService } from "../Services/userService.js";

async function allUsers(req: Request, res: Response) {
    const users = await UserService.allUsers()
    res.send({ users })
}

async function create(req: Request, res: Response) {
    const { email, name, age } = req.body

    if (email && name) {
        const userExist = await UserService.findOne({ email })
        if (!userExist) {
            const newUser = await UserService.create({ email, name,age: parseInt(age) })
            res.send({ users: newUser })
        } else {
            res.send({ error: "Usuario já existe" })
        }

    } else {
        res.send({ error: "Dados não preenchidos" })
    }


}



export const UserController = {
    allUsers,
    create
}