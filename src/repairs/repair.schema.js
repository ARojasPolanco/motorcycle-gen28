import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrordata.js'

export const repairSchema = z.object({
    date: z.date({
        invalid_type_error: "Date must be a correct format",
        required_error: "Date is required"
    }),
    motorsNumber: z.string({
        invalid_type_error: "Motors number be a corret format",
        required_error: "Motors number is required"
    }).min(5).max(40),
    description: z.string({
        invalid_type_error: "Description be a correct format",
        required_error: "Description is required"
    }).min(5).max(200),
    status: z.enum(['pending', 'completed', 'canceled'])
})

export function validateRepair(data) {
    const result = userSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: repairData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        repairData
    }
}


export function validatePartialRepair(data) {
    const result = userSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: dataRepair
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        dataRepair
    }
}