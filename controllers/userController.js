const users = require("../models/userSchema");

//register logic
exports.userRegister = async (req, res) => {
    const file = req.file.filename
    const { fname, lname, email, gender, mobile, location, status } = req.body
    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
        res.status(400).json("all inputs are required")
    }

    try {
        const preuser = await users.findOne({ email })
        if (preuser) {
            res.status(403).json('user already exist')
        }
        else {
            const newUser = new users({
                fname,
                lname,
                email,
                mobile,
                gender,
                status,
                profile: file,
                location
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.getAllEmp = async (req, res) => {
    // get query parameter from req
    const search = req.query.search
    const query = {
            fname:{$regex:search,$options:"i"}
    }
    try {
        const userdata = await users.find(query)
        res.status(200).json(userdata)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// get a user

exports.getUserDetails = async (req, res) => {
    const { id } = req.params
    try {
        const userData = await users.findOne({ _id: id })
        if (userData) {
            res.status(200).json(userData)
        }
        else {
            res.status(404).json("user doesn't exist")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// edit user
exports.editUser = async (req, res) => {
    const { id } = req.params
    const { fname, lname, email, mobile, gender, status, location, user_profile } = req.body

    // to get image file
    const file = req.file ? req.file.filename : user_profile
    try {
        const updateUser = await users.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, gender, status, profile: file, location
        }, {
            new: true
        })
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch (err) {
        res.status(404).json(err)
    }
}

exports.deleteUser = async (req,res)=>{
    const { id } = req.params
     try {
        const removeUser = await users.findByIdAndDelete({ _id: id})
        console.log(removeUser)
        res.status(200).json(removeUser)
    }
    catch (err) {
        res.status(404).json(err)
    }
}