const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = require('../Models/user')

exports.signup=(req,res)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        const user = new users({
            email:req.body.email,
            password:hash,
        })
        user.save()
        .then(()=>res.status(201).json({message:'utiliseateur crée'+req}))
        .catch(error=>res.status(400).json({error}))
    })
    .catch(error => res.status(500).json(error))
}

exports.login=(req,res)=>{
    users.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.staus(401).json({error:'email invalid'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid=>{
            if(!valid){
                return res.status(401).json({error:'invalid password'})
            }
            res.status(200).json({
                userId:user._id,
                token: jwt.sign(
                    {userId:user._id},
                    "PIIQUANTE",
                    {expiresIn:'24h'}
                )
            })
        })
        .catch(error=>(res.status(500).json(error)))
    })
    .catch(error=>res.status(500).json(error))
}