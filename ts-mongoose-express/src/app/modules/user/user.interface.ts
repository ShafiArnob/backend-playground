import { HydratedDocument, Model } from "mongoose";

export interface IUser {
  id: string;
  role: "student";
  password: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  dateOfBirth?: string;
  gender: "male" | "female";
  email?: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
}

//instance method
export interface IUserMethods{
  fullName():string
}


/*
  static method 
  -> Its why we have used static and instance method at the same time 
  -> read Mongo Docs
*/
export interface UserModel extends Model<IUser, {}, IUserMethods>{
  getAdminUsers():Promise<HydratedDocument<IUser, IUserMethods>>
}

