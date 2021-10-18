const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }).then(() => {
    console.log('DB server is connected')
}).catch((e) => {
    console.log('There was an unexpected Error', e)
})

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    }, dob: {
        type: Date,
        required: true
    }, status: {
        type: String,
        default: 'ACTIVE',
        enum: ['ACTIVE', 'PAUSE']
    }
})

module.exports = mongoose.model('User', userSchema)