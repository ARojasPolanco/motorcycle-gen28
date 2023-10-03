import { Router } from "express";
import {
    createRepair,
    findOne,
    findPending
} from './repairs.controller.js'

export const router = Router()

router.route('/')
    .get(findPending)
    .post(createRepair)

router.route('/:id')
    .get(findOne)