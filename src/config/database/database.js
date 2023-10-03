import { Sequelize } from "sequelize";
import { envs } from '../env/envitoments.js'

export const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

export async function authenticate() {
    try {
        await sequelize.authenticate()
        console.log('Conection has been established sucessfully')
    } catch (error) {
        throw new Error('Authentication error', error)
    }
}

export async function syncUp() {
    try {
        await sequelize.sync()
        console.log('Conection has been synced sucessfully')
    } catch (error) {
        throw new Error('Synchronization error')
    }
}

