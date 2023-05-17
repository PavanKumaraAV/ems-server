
const express = require('express')
const router =new express.Router()
const userController = require("../controllers/userController")
const upload = require('../MulterConfig/storageConfig')


// register
router.post('/employee/register', upload.single('user_profile') ,userController.userRegister)

router.get('/get-all-employee',userController.getAllEmp)

// get userdetails
router.get('/employee/view/:id',userController.getUserDetails)

router.put('/employee/edit/:id',upload.single('user_profile'),userController.editUser)

//delete user
router.delete('/employee/delete/:id',userController.deleteUser)

module.exports = router 