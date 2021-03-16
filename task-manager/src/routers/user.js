const express = require('express')
const User = require('../models/user')
const auth = require('../routers/middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()



router.get('/test', (req,res)=>{
    res.send('from new file')
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }

    /*user.save().then((result)=>{
        res.status(201).send(result)
    }).catch((error)=>{
        res.status(400).send(error)
    })*/
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    /*try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }*/

    /*User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(500).send()
    })*/
})



router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const users = await User.findById(_id)
        if (!users){
            return res.status(404).send()
        }

        res.send(users)

    } catch (e) {
        res.status(500).send(e)
    }

    /*User.findById(_id).then((user)=>{
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        if(error.name === 'CastError'){
            return res.status(400).send('Invalid id')
        }
        res.status(500).send(error)
    })*/
})


router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try {
        //const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }

})


router.delete('/users/me', auth, async (req, res) => {

    try {
        /*const user = await User.findByIdAndDelete(req.user._id)
        if (!user){
            return res.status(404).send()
        }*/
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await  req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res) =>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('please upload a image .jpg or .jpeg or .png'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar') ,async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()

    req.user.avatar =  buffer
    await req.user.save()
    res.send()
}, (error,req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req,res, next)=>{
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router

