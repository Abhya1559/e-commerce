import mongoose, { Schema, Document, Model } from 'mongoose';

export interface PUser extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  store: string;
  images: string[];
  rating: number;
}
const ProductSchema: Schema<PUser> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    store: { type: String, required: true },
    images: { type: [String], required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);
const Product: Model<PUser> =
  mongoose.models.product || mongoose.model<PUser>('Product', ProductSchema);

export default Product;
