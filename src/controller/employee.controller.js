import { pool } from "../db.js"

export const getEmployees = async (req, res) => {
   try {
      const employees = await pool.query('SELECT * FROM employee')
   res.send({ "employees": employees[0] })
   } catch (error) {
      return res.status(500).json({message:"someting wrong"})
   }
}

export const getEmployeeById = async (req, res) => {
   try {
      const employee = await pool.query('SELECT * FROM employee WHERE id=?',[req.params.id])
      if(employee[0].length === 0) return res.status(404).json({"mensage":'employee not found'})
      res.send(employee[0])
   } catch (error) {
      return res.status(500).json({message:"someting wrong"})
   }
}

export const createEmployee = async (req, res) => {
   try {
      const {name, salary} = req.body
   const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name, salary])
   res.send({id: rows.insertId, name,salary})
   } catch (error) {
      return res.status(500).json({message:"someting wrong"})
   }
}

export const updateEmployee = async (req, res) => {
   try {
      const {name,salary}=req.body
      const id = req.params.id

      const result = await pool.query('UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?;',
      [name,salary,id])
      if(result[0].affectedRows <= 0) return res.status(404).json({"message":"employee not found"})

      const [employee] = await pool.query('SELECT * FROM employee WHERE id=?',[id])   
      res.send(employee[0])
   } catch (error) {
      return res.status(500).json({message:"someting wrong"})
   }

}

export const deleteEmployee = async (req, res) => {
   try {
      const result = await pool.query('DELETE FROM employee WHERE id = ?',[req.params.id])
   
      if(result[0].affectedRows <= 0) return res.status(404).json({"mensage":'employee not found'})
      res.sendStatus(204)
   } catch (error) {
      return res.status(500).json({message:"someting wrong"})
   }
}