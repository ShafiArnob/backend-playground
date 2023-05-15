import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { Schema, model } from 'mongoose'

const app:Application = express()

app.use(cors())
//parse date
app.use(express.json())
app.use(express.urlencoded())


app.get("/",(req:Request, res:Response, next:NextFunction)=>{
  //step 1 - Interface
  interface IUser {
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
  //step 2 - Schema
  const userSchema = new Schema<IUser>({
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

  //step 3 - Model
  const User = model<IUser>("User", userSchema)

  //step 4 - DB Query
  const createUserToDB = async() =>{
    const user = new User ({
      id: "779",
      role: "student",
      password: "1234",
      name: {
        firstName: "Ahmed",
        middleName: "Shafi",
        lastName: "Arnob",
      },
      dateOfBirth: "17 June 2000",
      gender: "male",
      email: "shafiarnob@gmail.com",
      contactNo: "017******",
      emergencyContactNo: "013******",
      presentAddress: "Basha",
      permanentAddress: "Chan",
    })

    await user.save()

    console.log(user);
    
  }
  
  createUserToDB()
})

export default app