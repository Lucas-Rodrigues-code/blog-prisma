import { Router } from "express";
import { PostController } from '../Controllers/postController.js'
import { UserController } from '../Controllers/userController.js'

const router = Router();
router.get('/posts', PostController.allPost)
router.get('/posts/:id', PostController.findOnePost)
router.post('/posts', PostController.createPost)
router.put('/posts/:id', PostController.togglePOst)
router.delete('/posts/:id', PostController.deletePost)

router.get('/users', UserController.allUsers)
router.post('/user', UserController.create)


export default router;