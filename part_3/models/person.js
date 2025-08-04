const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const phoneRegex = /^\d{2,3}-\d+$/

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minlength: [8, 'Phone number must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        return phoneRegex.test(v)
      },
      message: props =>
        `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXX`
    },
    required: [true, 'Phone number is required']
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
