import mongoose,{ Schema, Document, Model }  from "mongoose"
import bcrypt from "bcrypt";

// Extend the Document interface so "this" works in middleware// Extend the Document interface so "this" works in middleware
export interface IUser  extends Document{
    name:string,
    email:string,
    password:string,
}

const UserSchema:Schema<IUser> = new Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{
    timestamps:true
}) 

UserSchema.pre<IUser>('save',async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next()
    
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;