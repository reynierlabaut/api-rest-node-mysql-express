import { Router } from "express";
import { getEmployees,createEmployee,updateEmployee,deleteEmployee, getEmployeeById } from "../controller/employee.controller.js"; 

const router = Router()


router.get('/employees', getEmployees)

router.get('/employee/:id', getEmployeeById)

router.post('/employees',createEmployee )

router.patch('/employees/:id',updateEmployee)

router.delete('/employees/:id', deleteEmployee)

export default router