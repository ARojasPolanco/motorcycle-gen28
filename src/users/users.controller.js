import { encryptedPassword, verifyPassword } from "../config/plugins/encripted-password.js"
import generateJWT from "../config/plugins/generate-jwt.plugin.js"
import { AppError } from "../error/appError.js"
import { catchAsync } from "../error/catchAsync.js"

import { validateLoginUser, validatePartialUser, validateUser } from "./user.schema.js"
import { UserService } from "./users_service.js"

const userService = new UserService()

export const findAllUsers = catchAsync(async (req, res, next) => {
    const users = await userService.findAllUsers()
    return res.json(users)
})

export const createUser = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, usersData } = validateUser(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.createUser(usersData)
    return res.status(201).json(user)
})

export const findOneUser = catchAsync(async (req, res, next) => {
    const { user } = req
    return res.json(user)

})

export const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    const { hasError, errorMessages, dataUsers } = validatePartialUser(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const updateUser = await userService.updateUser(user, dataUsers)

    return res.json(updateUser)
})

export const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const user = await userService.findOneUser(id)

    if (!user) {
        return next(new AppError(`User whit id ${id} not found`, 404))
    }

    await userService.deleteUser(user)

    return res.status(204).json(null)
})

export const login = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, usersData } = validateLoginUser(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.login(usersData.email)

    if (!user) {
        return next(new AppError(`User whit id ${id} not found`, 404))
    }

    const isCorrectPassword = await verifyPassword(
        usersData.password,
        user.password
    )

    if (!isCorrectPassword) {
        return next(new AppError('Incorrect email or password', 401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    })

})

export const register = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, usersData } = validateUser(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.createUsers(usersData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    })

})

export const changePassword = catchAsync(async (req, res, next) => {

    const { sessionUser } = req;


    const { currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword) {
        return next(new AppError('The password canont be equals', 400))
    }

    const isCorrectPassword = await verifyPassword(
        currentPassword,
        sessionUser.password
    )

    if (!isCorrectPassword) {
        return next(new AppError('Incorrect email or password', 401))
    }

    const hashedNewPassword = await encryptedPassword(newPassword)

    await userService.updatePassword(sessionUser, {
        password: hashedNewPassword
    })

    return res.status(200).json({
        message: 'The user password was updated succesfully'
    })

})