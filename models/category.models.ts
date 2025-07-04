import mongoose, { Model, Document, Schema } from 'mongoose';

export interface CUser extends Document {
  name: string;
  slug: string;
}

const CategorySchema: Schema<CUser> = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

const Category: Model<CUser> =
  mongoose.models.category || mongoose.model<CUser>('Category', CategorySchema);

export default Category;
