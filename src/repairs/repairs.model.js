import { DataTypes } from "sequelize";
import { sequelize } from "../config/database/database.js";

const Repairs = sequelize.define('repairs', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'repair_id'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'canceled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'created_by'
    }
})

export default Repairs;