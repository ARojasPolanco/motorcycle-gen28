import { Router } from "express";
import {
    createRepair,
    findOne,
    findPending,
    deleteRepair,
    updateRepair
} from './repairs.controller.js'
import { protect, restrictTo } from "../users/users.middleware.js";

export const router = Router()

router.route('/')
    .get(protect, restrictTo('employee'), findPending)
    .post(protect, createRepair)

router.route('/:id')
    .get(protect, restrictTo('employee'), findOne)
    .patch(protect, restrictTo('employee'), updateRepair)
    .delete(protect, restrictTo('employee'), deleteRepair)