import mongoose, { Model, Document, Schema } from 'mongoose';
import { IUser } from './user.models';
import { PUser } from './products.models';

export interface RUser extends Document {
  user: mongoose.Types.ObjectId | IUser;
  Product: mongoose.Types.ObjectId | PUser;
  rating: String;
  comment: String;
}

const RatingSchema: Schema<RUser> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  Product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  rating: { type: String, default: 1 },
  comment: { type: String, default: 'No comment till yet' },
});

const Rating: Model<RUser> =
  mongoose.models.Rating || mongoose.model<RUser>('Rating', RatingSchema);

export default Rating;
