import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {                            
    type: String,
    required: false,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});


export default mongoose.model("User",userSchema)