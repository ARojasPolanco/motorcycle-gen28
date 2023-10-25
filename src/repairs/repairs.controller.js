import { AppError } from "../error/appError.js"
import { catchAsync } from "../error/catchAsync.js"
import { validatePartialRepair, validateRepair } from "./repair.schema.js"
import { RepairService } from "./repairs_service.js"

const repairService = new RepairService()

export const findPending = catchAsync(async (_, res, next) => {
    const repair = await repairService.findPending()
    return res.json(repair)
})

export const createRepair = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, repairData } = validateRepair(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const repair = await repairService.createRepair(repairData)

    return res.status(201).json(repair)
})

export const findOne = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const repair = await repairService.findOneRepair(id)

    if (!repair) {
        return next(new AppError(`Repair whit id ${id} not found`, 404))
    }

    return res.json(repair)
})

export const updateRepair = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, dataRepair } = validatePartialRepair(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params

    const repair = await repairService.findOneRepair(id)

    if (!repair) {
        return next(new AppError(`Repair whit id ${id} not found`, 404))
    }

    const updateRepair = await repairService.updateRepair(repair, dataRepair)

    return res.json(updateRepair)
})

export const deleteRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const repair = await repairService.findOneRepair(id)

    if (!repair) {
        return next(new AppError(`Repair whit id ${id} not found`, 404))
    }

    await repairService.deleteRepair(repair)

    return res.status(204).json(null)
})