import {Schema, model} from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  modules: object;
}

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  modules: { type: Schema.Types.Mixed, required: true }
});

export default model<IUser>("User", UserSchema);