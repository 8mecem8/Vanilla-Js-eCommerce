const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



const userSchema = new mongoose.Schema({
  email:{
      type: String,
      required: true, 
      index: true,
      unique: true,
  },
  name: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true,
  },
  isAdmin:{
      type: Boolean,
      required: true,
      default:false,
  }
});




/* userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})
 */
userSchema.plugin(uniqueValidator)




const userModel = mongoose.model('User', userSchema)

module.exports = userModel