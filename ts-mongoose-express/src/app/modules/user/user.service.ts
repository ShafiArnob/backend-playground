import { IUser } from "./user.interface";
import User from "./user.model";

export const createUserToDB = async(payload:IUser) =>{
  const user = new User (payload)

  await user.save()

  return user
}

export const getUsersFromDB = async()=>{
  const users = await User.find()
  return users
}