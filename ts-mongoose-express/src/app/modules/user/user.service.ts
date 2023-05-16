import User from "./user.model";

export const createUserToDB = async() =>{
  const user = new User ({
    id: "801",
    role: "student",
    password: "1234",
    name: {
      firstName: "Mr. PP",
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

  return user
}