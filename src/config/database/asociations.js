import User from "../../users/users.model.js";
import Repairs from "../../repairs/repairs.model.js";

export const initModel = () => {

    User.hasMany(Repairs, { foreignKey: 'created_by', as: 'UserCreatedRepair' })
    Repairs.belongsTo(User, { foreignKey: 'created_by' })

}