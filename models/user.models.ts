import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// Extend the Document interface so "this" works in middleware
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface UserMethods {
  isValidPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser, Model<IUser>, UserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    methods: {
      isValidPassword(password) {
        try {
          return bcrypt.compare(password, this.password);
        } catch (error) {
          throw new Error('Password comparison failed');
        }
      },
    },
    timestamps: true,
  }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
