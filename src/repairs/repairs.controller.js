import { validatePartialRepair, validateRepair } from "./repair.schema.js"
import { RepairService } from "./repairs_service.js"

const repairService = new RepairService()

export const findPending = async (_, res) => {

    try {
        const repair = await repairService.findPending()
        return res.json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createRepair = async (req, res) => {

    try {

        const { hasError, errorMessages, repairData } = validateRepair(req.body)

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        const repair = await repairService.createRepair(repairData)

        return res.status(201).json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOne = async (req, res) => {

    try {
        const { id } = req.params

        const repair = await repairService.findOneRepair(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair whit id ${id} not found`
            })
        }

        return res.json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateRepair = async (req, res) => {
    try {

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
            return res.status(404).json({
                status: 'error',
                message: `Repair whit id ${id} not found`
            })
        }

        const updateRepair = await repairService.updateRepair(repair, dataRepair)

        return res.json(updateRepair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteRepair = async (req, res) => {
    try {
        const { id } = req.params

        const repair = await repairService.findOneRepair(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair whit id ${id} not found`
            })
        }

        await repairService.deleteRepair(repair)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json(error)
    }
}