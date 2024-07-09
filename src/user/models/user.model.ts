import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export { UserSchema };

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
