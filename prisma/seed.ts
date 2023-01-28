import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main(){
    await prisma.user.deleteMany()
    await prisma.post.deleteMany()
    await prisma.hashtag.deleteMany()
    
    const user = await prisma.user.create({
        data:{
            email:"teste@gmail.com",
            name: "teste",
            age: 71
        }
    });

    const post = await prisma.post.create({
        data:{
            title:"teste",
            body:"teste",
            authorId:user.id
        }
    })
    const hashtag = await prisma.hashtag.create({
        data:{
            name:"teste",
            postId:post.id,
        }
    })
}
main()