import prisma from "../database/db.js";
import { createDataProp, updateDataPro } from "../protocols/postProtocol.js";


async function getAllPost() {
    return await prisma.post.findMany({
        where: {
            published: true
        },
        orderBy: {
            id: 'desc'
        },
        include: {
            Hashtag: true
        },
    })
}

async function onePost(id: number) {
    return await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            Hashtag: true
        },
    })

}

async function create(data: createDataProp) {
    const post = await prisma.post.create({
        data: {
            title: data.title,
            body: data.body,
            authorId: data.authorId
        }})


    const hashtag = await prisma.hashtag.create({
        data: {
            name: data.hashtag,
            postId: post.id
        }
    })
    return { post, hashtag }
}

async function update(id: number, data: updateDataPro) {
    return await prisma.post.update({
        where: {
            id
        },
        data: {
            title: data.title,
            body: data.body,
            authorId: data.authorId,
            published: data.published
        }
    })
}

async function deletePost(id: number) {
    return await prisma.post.delete({
        where: {
            id
        }
    })

}

export const PostService = {
    getAllPost,
    onePost,
    create,
    update,
    deletePost
}

