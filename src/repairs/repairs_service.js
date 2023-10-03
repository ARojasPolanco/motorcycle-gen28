import Repairs from "./repairs.model.js"

export class RepairService {

    async findPending() {
        return await Repairs.findAll({
            where: {
                status: 'pending'
            }
        })
    }

    async createRepair(data) {
        return await Repairs.create(data)
    }

    async findOneRepair(id) {
        return await Repairs.findOne({
            where: {
                id: id,
                status: 'pending'
            }
        })
    }

    async updateRepair(repair) {
        return await repair.update({ status: 'completed' })
    }

    async deleteRepair(repair) {
        return await repair.update({ status: 'canceled' })
    }

}