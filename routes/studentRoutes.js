const express = require("express");
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

//router objects

const router = express.Router();

//routes

// Get All students List || Get
router.get('/getall',getStudents)

//Get students by ID
router.get('/get/:id',getStudentById)

// create students or post new students 
router.post('/create', createStudent)
 
//update students
router.put('/update/:id',updateStudent)

// Delete Students
router.delete('/delete/:id',deleteStudent)

module.exports = router;