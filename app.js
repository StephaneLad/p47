const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./Routes/user')
const sauceRoute = require('./Routes/sauce')

mongoose.connect('mongodb+srv://admin:VOndCM7Yxz6570Nk@cluster0.w2kbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
})

app.use('/api/auth',authRoute)
app.use('/api', sauceRoute)



module.exports = app