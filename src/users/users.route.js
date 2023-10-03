import { Router } from 'express'
import {
    findAllUsers,
    createUser,
    findOneUser,
    deleteUser,
    updateUser
} from './users.controller.js'

export const router = Router()

router
    .route('/users')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/users/:id')
    .get(findOneUser)
    .patch(updateUser)
    .delete(deleteUser)


