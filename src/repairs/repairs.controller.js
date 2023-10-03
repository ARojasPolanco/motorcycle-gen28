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
        const repair = await repairService.createRepair(req.body)

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