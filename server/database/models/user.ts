import {Schema, model} from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import mongoose from "mongoose";

// @ts-ignore
const AutoIncrement = AutoIncrementFactory(mongoose);

export interface IUser extends Document {
  username: string;
  id: number;
  permissions: string[];
  modules: Modules;
}

export interface Modules {
  [key: string]: any;
}

export interface UserInfo {
  username: string;
  userId: number;
  permissions: string[];
  [key: string]: any;
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  permissions: [{ type: String, required: true, default: [] }],
  modules: { type: Schema.Types.Mixed, required: true }
});

// @ts-ignore
UserSchema.plugin(AutoIncrement, {inc_field: "id"});

const User = model<IUser>("User", UserSchema);

export const getUsersCount = () : Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    User.count((err, count) => {
      if(err) return reject(err);

      resolve(count);
    });
  });
};

export default User;