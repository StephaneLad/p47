const sauce = require('../Models/sauce')
const fs = require('fs')

exports.saucesGet=(req,res)=>{
    // console.log('t')
    sauce.find()
    // .then(sauce => {
    //     console.log(sauce.length)
    //     return res.status(200).json(sauce)
    // })
    .then(sauce=>res.status(200).json(sauce))
    .catch(error=>res.status(404).json({error}))
}

exports.sauceId=(req,res)=>{
    sauce.findOne({_id:req.params.id})
    .then(sauce=>{
        if(!sauce){
            return res.status(404).json({message:'sauce not found'})
        }
        res.status(201).json(sauce)
    })
    .catch(error=>res.status(500).json({error}))
}

exports.saucesPost=(req,res)=>{
    let data=JSON.parse(req.body.sauce)
    const sauces = new sauce({
    userId:data.userId,
    name:data.name,
    manufacturer:data.manufacturer,
    description:data.description,
    mainPepper:data.mainPepper,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    heat:data.heat,
    likes:0,
    dislikes:0,
    usersLiked:[],
    usersDisliked:[]
    })
    sauces.save()
    .then(()=>res.status(201).json({message:'sauce crée'}))
    .catch(error=>res.status(400).json({error}))
}

exports.saucePut=(req,res)=>{
    
        if(req.body.sauce!==undefined){
            sauce.findOne({_id:req.params.id})
            .then(curentSauce=>{
                const filename= curentSauce.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`,()=>{
                    let newContent= JSON.parse(req.body.sauce)
                    sauce.updateOne({_id:req.params.id},{
                        userId:newContent.userId,
                        name:newContent.name,
                        manufacturer:newContent.manufacturer,
                        description:newContent.description,
                        mainPepper:newContent.mainPepper,
                        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        heat:newContent.heat
                    })
                    .then(()=>res.status(200).json({message:'ok'}))
                })
            })
            .catch(error=>res.status(500).json({error}))
        }else{          

            let newContent = req.body
            sauce.updateOne({_id:req.params.id},{
                userId:newContent.userId,
                name:newContent.name,
                manufacturer:newContent.manufacturer,
                description:newContent.description,
                mainPepper:newContent.mainPepper,
                heat:newContent.heat,
            })
            .then(()=>res.status(200).json({message:'ok'}))
            
        }
    
}

exports.sauceDelete=(req,res)=>{
    sauce.findOne({_id:req.params.id})
    .then(curentSauce=>{
        const filename= curentSauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`,()=>{
            sauce.deleteOne({_id:req.params.id})
            .then(()=>res.status(200).json({message:'sauce suprimer'}))
            .catch(error=>res.status(500).json({error}))
        })
    })
    .catch(error=>res.status(500).json({error}))
}

exports.sauceLike=(req,res)=>{ 
        
        sauce.findOne({_id:req.params.id})
        .then(curentSauce=>{
            if(req.body.like===1){
                console.log('like')
                curentSauce.usersLiked=[...curentSauce.usersLiked,req.body.userId]
                curentSauce.likes+=1
                sauce.updateOne({_id:req.params.id},{
                    usersLiked:curentSauce.usersLiked,
                    likes:curentSauce.likes
                })
                .then(()=>res.status(200).json({message:'ok'}))
            }

            if(req.body.like===0){
                let userLike=curentSauce.usersLiked.filter(users=>users===req.body.userId)
                let anotherUserLike=curentSauce.usersLiked.filter(users=>users!==req.body.userId)
                let userDislike=curentSauce.usersDisliked.filter(users=>users===req.body.userId)
                let anotherUserDislike=curentSauce.usersDisliked.filter(users=>users!==req.body.userId)
                if(userLike.length>0){
                    curentSauce.usersLiked=[...anotherUserLike]
                    curentSauce.likes-=1
                    sauce.updateOne({_id:req.params.id},{
                        usersLiked:curentSauce.usersLiked,
                        likes:curentSauce.likes
                    })
                    .then(()=>res.status(200).json({message:'ok'}))
                    return
                }

                if(userDislike.length>0){
                    curentSauce.usersDisliked=[...anotherUserDislike]
                    curentSauce.dislikes-=1
                    sauce.updateOne({_id:req.params.id},{
                        usersDisliked:curentSauce.usersDisliked,
                        dislikes:curentSauce.dislikes
                    })
                    .then(()=>res.status(200).json({message:'ok'}))
                    return
                }

            }

            if(req.body.like===-1){
                curentSauce.usersDisliked=[...curentSauce.usersDisliked,req.body.userId]
                curentSauce.dislikes+=1
                sauce.updateOne({_id:req.params.id},{
                    usersDisliked:curentSauce.usersDisliked,
                    dislikes:curentSauce.dislikes
                })
                .then(()=>res.status(200).json({message:'ok'}))
            }
        })
        .catch(error=>res.status(500).json({error}))
}