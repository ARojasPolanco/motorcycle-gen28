import { envs } from "../config/env/envitoments.js";
import { AppError } from "../error/appError.js";
import { UserService } from "./users_service.js";
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const userService = new UserService

export const validateExistUser = async (req, res, next) => {

    const { id } = req.params;

    const user = await userService.findOneUser(id)

    if (!user) {
        return next(new AppError(`User whit id ${id} not found`, 404))
    }

    req.user = user

    next()
}

export const protect = async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in, please log in to get access', 401))
    }

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWT_SEED,
    )

    const user = await userService.findOneLogginUser(decoded.id)

    if (!user) {
        return next(new AppError('The owner of this token is not longer available', 401))
    }

    req.sessionUser = user;

    next();
}

export const restrictTo = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next()
    }
}

export const protectAccountOwner = (req, res, next) => {

    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
        return next(new AppError('You do not have permissions for this action', 401))
    }

    next()
}