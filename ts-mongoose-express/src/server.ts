import mongoose from 'mongoose'
import app from './app'

const PORT:number = 3000

// Database Connection
async function main() {
  try{
    await mongoose.connect("mongodb://localhost:27017/test")
    console.log("DB Connection Successful");

    app.listen(PORT, ()=>{
      console.log(`Server Running Port ${PORT}`);
    })
  
  }catch(err){
    console.log(`Failed to connect ${err}`);
  }
}
main()


