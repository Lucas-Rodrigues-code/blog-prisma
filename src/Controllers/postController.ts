import { Request, Response } from "express";
import { PostService } from "../Services/postServices.js";
import { UserService } from "../Services/userService.js";

async function allPost(req: Request, res: Response) {
    const posts = await PostService.getAllPost()
    res.send({ posts })
}

async function findOnePost(req: Request, res: Response) {
    const { id } = req.params
    const post = await PostService.onePost(parseInt(id))
    if (post) {
        res.send(post)
        return
    }
    res.status(409).send({ error: "Post não encontrado" })

}

async function createPost(req: Request, res: Response) {
    const { title, body, author, hashtag } = req.body;

    if (title && body && author && hashtag) {
        const user = await UserService.findOne({
            id: parseInt(author)
        });

        if (user) {
            const post = await PostService.create({
                title, body, authorId: user.id, hashtag
            });
            res.send({ post })
        } else {
            res.send({ error: "autor não existe" })
        }
    } else {
        res.send({ error: "Dados não preenchidos" })
    }
}

async function togglePOst(req: Request, res: Response) {
    const { id } = req.params;
    const post = await PostService.onePost(parseInt(id))
    if (post) {
        const postUpadate = await PostService.update(
            post.id,
            { published: !post.published }
        );
        res.send({ post: postUpadate })
    } else {
        res.send({ error: "Post não existe" })
    }
}

async function deletePost(req: Request, res: Response) {
    const { id } = req.params;
    const post = await PostService.onePost(parseInt(id))
    if (post) {
        const postDelete = await PostService.deletePost(parseInt(id))
        res.send({ status: true })
    } else {
        res.send({ error: "Post não existe" })
    }
}

export const PostController = {
    allPost,
    findOnePost,
    createPost,
    togglePOst,
    deletePost
}