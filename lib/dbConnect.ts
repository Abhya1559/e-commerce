import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const MONGO_URI = process.env.MONGO_URI!

if (!MONGO_URI) {
    throw new Error("while connecting there is an error occuring in connecting env")
}

let cached =  (global as any).mongoose

if (!cached) {
     cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function dbConnect(){
    if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
   cached.promise = mongoose.connect(MONGO_URI,{
    bufferCommands:false
   }).then((mongoose) => {
        console.log("MongoDB connected");
        return mongoose;
      }).catch(err => console.error("Mongo error", err));
  }
 cached.conn = await cached.promise;
  return cached.conn;
}