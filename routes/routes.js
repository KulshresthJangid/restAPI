const express = require('express')
const User = require('../db/db')
const mongoose = require('mongoose')
const validator = require('validator')
const {parse, stringify} = require('flatted');

const router = express.Router()




router.get('/', (req, res) => {
    res.send("Welcome to Home Page!")
})

router.get('/users', (req, res) => {
    User.find({}).then(function(users){
        res.send(users);
    }).catch((e) => {
        console.log("Error from the Get Request", e)
    });
})

router.post('/add/users', async (req, res) => {
    try {
        const users = new User({
            name: req.body.name,
            dob: req.body.dob,
            status: req.body.status
        })
    
        await users.save()
        res.send(users)
    } catch (e) {
        res.status(400).send("error")
        console.log('error from the post request', e.message)
    }
})

router.put('/user/:id', (req, res) => {
    User.findOneAndUpdate({
        _id: req.params.id
    }, req.body).then((user) => {
        User.findOne({ _id: req.params.id }).then((user) => {
            res.send(user)
        })
    })
})

router.patch('/user/pause/:id',async (req, res) => {
    try {
        const user = User.findOne({ _id: req.params.id })
        user.then((user) => {
            if(user.status == "ACTIVE") {
                user.status = "PAUSE"
                user.save()
                res.send(user)
            } else {
                res.send("This User's status is already paused")
            }
        })
    } catch (e) {
        res.status(400).send("error")
        console.log(e.message)
    }
})

router.get('/pausedUsers', (req, res) => {
    User.find({ status: "PAUSE" }).then((users) => {
        res.send(users)
    })
})

router.delete('/user/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }).then((user) => {
        res.send(user)
    })
})

module.exports = router