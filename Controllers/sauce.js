const { json } = require('express/lib/response')
const sauce = require('../Models/sauce')

exports.saucesGet=(req,res)=>{
    res.status(201).json({message:'ok'})
}

exports.sauceId=(req,res)=>{
    sauce.findOne({id:req.params.id})
    .then(sauce=>{
        if(!sauce){
            return res.status(404).json({message:'sauce not found'})
        }
        res.status(201).json({message:'envoi sauce'})
    })
    .catch(error=>res.status(500).json({error}))
}

exports.saucesPost=(req,res)=>{
    console.log(req.body)
        const sauces = new sauce({
        userId:req.body.userId,
        name:req.body.name,
        manufacturer:req.body.manufacturer,
        description:req.body.description,
        mainPepper:req.body.mainPepper,
        imageUrl:req.body.imageUrl,
        heat:req.body.heat,
        likes:0,
        dislikes:0,
        // usersLiked:,
        // usersDisliked:
    })
    sauces.save()
        .then(()=>res.status(201).json({message:'sauce crée'+req.body}))
        .catch(error=>res.status(400).json({error}))
}