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
        const user = await userService.createUser(req.body)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOneUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userService.findOneUser(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User whit id ${id} not found`
            })
        }

        return res.json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userService.findOneUser(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User whit id ${id} not found`
            })
        }

        const updateUser = await userService.updateUser(user, req.body)

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