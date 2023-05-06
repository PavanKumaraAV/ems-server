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
