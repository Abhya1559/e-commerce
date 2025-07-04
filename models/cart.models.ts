import mongoose, { Model, Schema, Document } from 'mongoose';
import { IUser } from './user.models';
import { PUser } from './products.models';

export interface CartUser extends Document {
  user: mongoose.Types.ObjectId | IUser;
  items: mongoose.Types.ObjectId | PUser;
  updatedAt: Date;
}

const CartSchema: Schema<CartUser> = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  items: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
});

const Cart: Model<CartUser> = mongoose.models.Order || mongoose.model<CartUser>('Cart', CartSchema);

export default Cart;
