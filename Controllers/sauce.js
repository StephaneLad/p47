
const sauce = require('../Models/sauce')

exports.saucesGet=(req,res)=>{
    sauce.find()
    .then(sauce=>
        res.status(200).json(sauce))
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
        .then(()=>res.status(201).json({message:'sauce crée'+req.body}))
        .catch(error=>res.status(400).json({error}))
}
exports.saucePut=(req,res)=>{
    // if(req.body.sauce.length >=1){
    //     let data = req.body.sauce
    //     sauce.updateOne({id:req.params.id}),{
    //     userId:data.userId,
    //     name:data.name,
    //     manufacturer:data.manufacturer,
    //     description:data.description,
    //     mainPepper:data.mainPepper,
    //     imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    //     heat:data.heat,
    //     }
    // }
    console.log(req.body)
    sauce.findOne({_id:req.params.id})
    .then(sauce=>{
        // probleme d'image si image recup req.body.sauce sans immg req.body
        let toto= req.body
        if(toto.sauce.length >=1){
            res.status(200).json({message:'ok'})
        }else{
            if(toto.length>=1){
                res.status(200).json({message:'ok'})
            }else{
                res.status(200).json({message:'ok'})
            }
        }
        res.status(200).json({message:'ok'})
    })
    .catch(error=>res.status(500).json({error}))
    
}

exports.sauceDelete=(req,res)=>{
    sauce.deleteOne({id:req.params.id})
    .then(()=>res.status(200).json({message:'sauce suprimer'}))
    .catch(error=>res.status(500).json({error}))
}

exports.sauceLike=(req,res)=>{ 
        
        sauce.findOne({_id:req.params.id})
        .then(curentSauce=>{
            console.log('0')
            curentSauce.usersLiked=[...curentSauce.usersLiked,req.body.userId]
            curentSauce.likes+=1
            console.log('1')
            sauce.updateOne({_id:req.params.id},{
                usersLiked:curentSauce.usersLiked,
                likes:curentSauce.likes
            })
            .then(()=>res.status(200).json({message:'ok'}))
            console.log('2')
        })
        .catch(error=>res.status(500).json({error}))
        // sauce.updateOne({_id:req.params.id}),
        // {$set:{
        //     // like:1,
        //     userLiked:req.body.userId
        //     // userLiked:[...userLiked,req.body.userId]
        // }}
        // return res.status(200).json({message:'ok'})
    
    // if(req.body.like===0){
    //     sauce.findOne({_id:req.params.id})  
    //     .then(sauces=>{
    //         let userLike=sauces.filter(sauce=>sauce.userLiked===req.body.userId)
    //         let anotherUserLike=sauces.filter(sauce=>sauce.userLiked!==req.body.userId)
    //         let userDislike=sauces.filter(sauce=>sauce.userDisliked===req.body.userId)
    //         let anotherUserDislike=sauces.filter(sauce=>sauce.userDisliked!==req.body.userId)
    //         if(userLike){
    //             const update={
    //             likes:sauces.like-1,
    //             userlike:anotherUserLike}

    //             sauce.findByIdAndUpdate(
    //             req.params.id,
    //             {$set:update},
    //             {new:true},
    //             (err,docs)=>{
    //                 if(!err)res.send(docs)
    //                 else console.log(err)
    //             }
    //             )
    //         }
    //         if(userDislike){
    //             dislikes:sauces.dislikes-1
    //             userDislike:anotherUserDislike
    //         }
    //     }) 
    //     .catch(error=>res.status(400).json({error}))
    // }
    // if(req.body.like===-1){
    //     sauce.updateOne({_id:req.params.id}),{
    //         dislikes:sauce.dislikes+1,
    //         usersDisliked:{...sauce.usersDisliked+req.body.userId}
    //     }
    //     .then((res.status(200).json({message:'ok'})))
    //     .catch(error=>res.status(500).json({error}))
    // }
    
    // console.log(req.body)
    // res.status(200).json({message:'ok'})
}