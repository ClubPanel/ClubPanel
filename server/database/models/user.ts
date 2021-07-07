import {Schema, model} from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import mongoose from "mongoose";

// @ts-ignore
const AutoIncrement = AutoIncrementFactory(mongoose);

/**
 * The information about a user stored in the database.
 */
export interface IUser extends Document {
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The user's name, or username/
   */
  username: string;
  /**
   * The user's numerical ID.
   */
  id: number;
  /**
   * The user's permissions.
   */
  permissions: string[];
  /**
   * Information about a user that modules can store.
   */
  modules: Modules;
}

/**
 * The base interface for module data on an IUser.
 */
export interface Modules {
  [key: string]: any;
}

/**
 * The information about a user that will be sent to the client.
 */
export interface UserInfo {
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The user's name, or username/
   */
  username: string;
  /**
   * The user's numerical ID.
   */
  userId: number;
  /**
   * The user's permissions.
   */
  permissions: string[];
  [key: string]: any;
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  permissions: [{ type: String, required: true, default: [] }],
  modules: { type: Schema.Types.Mixed, required: true }
});

// @ts-ignore
UserSchema.plugin(AutoIncrement, {inc_field: "id"});

/**
 * The model for the user object.
 */
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