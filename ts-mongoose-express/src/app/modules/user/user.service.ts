import { IUser } from "./user.interface";
import User from "./user.model";

export const createUserToDB = async(payload:IUser) =>{
  const user = new User (payload)

  await user.save()

  console.log(user.fullName());
  
  return user
}

export const getUsersFromDB = async()=>{
  const users = await User.find()
  return users
}
//get single user
export const getUserByIdFromDB = async(payload:string)=>{
  const user = await User.findOne({id:payload},{
    name:1,
    contactNo:1
  })
  return user
}
// for Static method
export const getAdminUsersFromDB = async()=>{
  const admins = await User.getAdminUsers()
  return admins
}