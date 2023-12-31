import { DataTypes } from "sequelize";
import { sequelize } from "../config/database/database.js";
import { encryptedPassword } from "../config/plugins/encripted-password.js";

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'user_id'
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'last_name'
    },
    email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(),
        unique: true,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('client', 'employee'),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await encryptedPassword(user.password)
        }
    }
})

export default User;

