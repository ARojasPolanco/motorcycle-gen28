import { encryptedPassword, verifyPassword } from "../config/plugins/encripted-password.js"
import generateJWT from "../config/plugins/generate-jwt.plugin.js"
import { validateLoginUser, validatePartialUser, validateUser } from "./user.schema.js"
import { UserService } from "./users_service.js"


const userService = new UserService()

export const findAllUsers = async (_, res) => {
    try {
        const users = await userService.findAllUsers()
        return res.json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createUser = async (req, res) => {
    try {

        const { hasError, errorMessages, usersData } = validateUser(req.body)

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        const user = await userService.createUser(usersData)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOneUser = async (req, res) => {
    try {
        const { user } = req
        return res.json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateUser = async (req, res) => {
    try {

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
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userService.findOneUser(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User whit id ${id} not found`
            })
        }

        await userService.deleteUser(user)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const login = async (req, res) => {
    try {
        const { hasError, errorMessages, usersData } = validateLoginUser(req.body)

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        const user = await userService.login(usersData.email)

        if (!user) {
            return res.status(402).json({
                status: 'error',
                message: `User whit  ${email} not found`
            })
        }

        const isCorrectPassword = await verifyPassword(
            usersData.password,
            user.password
        )

        if (!isCorrectPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect email or password'
            })
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

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const register = async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const changePassword = async (req, res) => {

    try {
        const { sessionUser } = req;


        const { currentPassword, newPassword } = req.body;

        if (currentPassword === newPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'The password canont be equals'
            })
        }

        const isCorrectPassword = await verifyPassword(
            currentPassword,
            sessionUser.password
        )

        if (!isCorrectPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect email or password'
            })
        }

        const hashedNewPassword = await encryptedPassword(newPassword)

        await userService.updatePassword(sessionUser, {
            password: hashedNewPassword
        })

        return res.status(200).json({
            message: 'The user password was updated succesfully'
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}