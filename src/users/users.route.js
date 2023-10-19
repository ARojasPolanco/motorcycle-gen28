import { Router } from 'express'
import {
    findAllUsers,
    createUser,
    findOneUser,
    deleteUser,
    updateUser,
    register,
    login,
    changePassword
} from './users.controller.js'

import { protect, validateExistUser } from './users.middleware.js'

export const router = Router()

router.use(protect)

router.post('/login', login)

router.post('/register', register)

router.patch('/change-password', protect, changePassword)

router
    .route('/')
    .get(protect, findAllUsers)
    .post(createUser)

router
    .use('/:id', validateExistUser)
    .route('/:id')
    .get(findOneUser)
    .patch(updateUser)
    .delete(deleteUser)





