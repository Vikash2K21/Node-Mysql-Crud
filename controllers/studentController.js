//Get all students list
const db = require("../config/db");

const getStudents =async (req, res) =>{

    try{
        const data = await db.query("select * from students");
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No records found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All Students records",
            totalstudents: data[0].length,
            data: data[0],
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all students API",
            error,
        });
    }
}

// Get Student by Id
const getStudentById = async(req,res)=>{
    try{
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide Student id'
            })
        }

       // const data = await db.query(`select * from students where id`+studentId)
        const data = await db.query(`select * from students where id=?`,[studentId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No Record found",
            });
        }
        res.status(200).send({
            success:true,
            message:"Data found",
            studentDetails: data[0],
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in student API",
            error
            
        })
    }
};

// create new students

const createStudent =async (req,res) =>{
    try{
        const {name,age ,email} = req.body
        if(!name || !age || !email){
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            })
        }
        const data = await db.query(`Insert into students(name,age,email) values(?,?,?)`,[name,age ,email])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Error in Insert Query"
            })
        }
        res.status(201).send({
            success: true,
            message:"New Student Created Successfully",
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in the create Api",
            error
        })
    }
}

// update the students

const updateStudent = async(req,res) =>{
    try{
         const studentId = req.params.id
         if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Invalid Id Or provide id',
            })
         }
         const {name,age,email} = req.body
         const data = await db.query(`update students set name=?,age=?,email=? where id=? `,[name,age,email,studentId])
         if(!data){
            return res.status(500).send({
                sucess:false,
                message:"Error in Update Data",        
            });
         }
         res.status(200).send({
            success:true,
            message:"Student Details Updated",
         });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in the update ApI",
            error
        })
    }
}

const  deleteStudent = async (req,res)=>{
    try{
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:"please Provide Student"

            })
        }
        await db.query(`delete from students where id=?`,[studentId]);
        res.status(200).send({
            sucess:true,
            message:"Student Deleted Successfully",
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in Api",
            error
        })
    }
}

module.exports = {getStudents , getStudentById,createStudent ,updateStudent,deleteStudent }