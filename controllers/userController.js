const Usuarios = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');




exports.createAccount = async (req,res) => {
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password,12)
    try {
        await user.save()
        res.json({message: 'User created succesfully'})
    } catch (error) {
        console.log(error);
        res.json({message:"Error"})
        
    }
}

exports.Auth = async (req,res,next) => {
    //search user 
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        // if the user doesnt exist
        await res.status(401).json({message:'That user does´n exist'});
        next()
    } else {
        // The user exist, verify if the password is correct 
        if(!bcrypt.compareSync(password,user.password)){
            await res.status(401).json({message: 'Incorrect password'});
            next()
        } else {
            //sign Token
            const token = jwt.sign({
                email: user.user,
                name: user.name,
                id : user._id,
                
            },process.env.JWTKEY,
            {
                expiresIn: '1h'
            });
            res.json({token})
        }
    }

}   