import { Model, Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";

// used when we only used instance method
// type UserModel = Model<IUser, {}, IUserMethods>

//step 2 - Schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },

  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  email: {
    type: String,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
});

//!static method
userSchema.static("getAdminUsers", async function getAdminUsers(){
  const admins = await this.find({role:"Admin"})
  return admins
})

// instance method
userSchema.method("fullName", function fullName(){
  return this.name.firstName + " " + this.name.lastName
})

//step 3 - Model
const User = model<IUser, UserModel>("User", userSchema)

export default User