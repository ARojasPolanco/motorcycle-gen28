import { Router } from "express";
import {
    createRepair,
    findOne,
    findPending,
    deleteRepair,
    updateRepair
} from './repairs.controller.js'

export const router = Router()

router.route('/')
    .get(findPending)
    .post(createRepair)

router.route('/:id')
    .get(findOne)
    .patch(updateRepair)
    .delete(deleteRepair)