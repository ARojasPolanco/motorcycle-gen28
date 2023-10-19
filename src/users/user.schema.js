import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrordata.js'

export const userSchema = z.object({
    firstName: z.string({
        invalid_type_error: "First name must be a correct format",
        required_error: "First name is required"
    }).min(2).max(99),
    lastName: z.string({
        invalid_type_error: "Last name must be a correct format",
        required_error: "Last name is required"
    }).min(2).max(99),
    email: z.string({
        required_error: "Email is required"
    }).email().min(2).max(150),
    password: z.string({
        required_error: "Password is required"
    }),
    role: z.enum(['client', 'employee'])
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email().min(2).max(150),
    password: z.string({
        required_error: "Password is required"
    })
})

export function validateLoginUser(data) {
    const result = loginSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: usersData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        usersData
    }
}

export function validateUser(data) {
    const result = userSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: usersData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        usersData
    }
}


export function validatePartialUser(data) {
    const result = userSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: dataUsers
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        dataUsers
    }
}
