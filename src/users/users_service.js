import User from "./users.model.js";

export class UserService {

    async findAllUsers() {
        return User.findAll()
    }

    async createUser(data) {
        return await User.create(data)
    }

    async findOneUser(id) {
        return await User.findOne({
            where: {
                id: id,
            }
        })
    }

    async updateUser(user, data) {
        return await user.update(data)
    }

    async deleteUser(user) {
        return await user.update({ status: false })
    }

    async login(email) {
        return await User.findOne({
            where: {
                email: email,
                status: true
            }
        })
    }

    async createUsers(data) {
        return await User.create(data)
    }

    async updatePassword(user, data) {
        return await user.update(data)
    }

    async findOneLogginUser(id) {
        return await User.findOne({
            where: {
                id: id,
                status: true
            }
        })
    }
} 