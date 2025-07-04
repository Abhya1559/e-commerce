import mongoose, { Model, Schema, Document } from 'mongoose';
import { IUser } from './user.models';
import { PUser } from './products.models';

export interface OUser extends Document {
  user: mongoose.Types.ObjectId | IUser;
  products: mongoose.Types.ObjectId | PUser;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  deliveryStatus: 'processing' | 'shipped' | 'delivered';
  address: string;
  paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
}

const OrderSchema: Schema<OUser> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], required: true },
    deliveryStatus: { type: String, enum: ['processing', 'shipped', 'delivered'], required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ['COD', 'Razorpay', 'Stripe'], required: true },
  },
  {
    timestamps: true,
  }
);

const Order: Model<OUser> = mongoose.models.Order || mongoose.model<OUser>('Order', OrderSchema);

export default Order;
