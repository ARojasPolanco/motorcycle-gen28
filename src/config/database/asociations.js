import User from "../../users/users.model.js";
import Repairs from "../../repairs/repairs.model.js";

export const initModel = () => {
    User.hasMany(Repairs, { foreignKey: "user_id", as: "userCreateRepair" });
    Repairs.belongsTo(User, { foreignKey: "user_id" });
};