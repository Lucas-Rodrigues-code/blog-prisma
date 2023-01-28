import prisma from "../database/db.js"
import { createDataProp, findOneProp } from "../protocols/userProtocol.js"

async function findOne(data:findOneProp) {
    return await prisma.user.findUnique({
        where:{
            id:data.id,
            email:data.email
        }
    })
}

async function allUsers() {
    return await prisma.user.findMany()
}

async function create(data:createDataProp) {
    return await prisma.user.create({
        data:{
            email:data.email,
            name:data.name ,
            age:data.age ?? 0
        }
    })
}

export const UserService = {
    findOne,
    allUsers,
    create
}