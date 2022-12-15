// Database connection function
import mongoose, { Connection } from "mongoose";
import mongodb from "mongodb"
const DB = process.env.DATABASE_URL;
// creating connection options interface for mongoose
const db = async ()=> { 
    interface ConnectOptions extends mongoose.ConnectOptions{
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
      }
 
    try {
       await mongoose.connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
            } as ConnectOptions);
            console.log(`Database connection successful!`)    
    } catch (err) {
        console.log(err);
    }
    
    }
    
export default db;