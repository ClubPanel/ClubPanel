import {GetConfig} from "../config/configManager";
import {MainConfig} from "../config/types/mainConfig";
import mongoose from "mongoose";

export let Database: mongoose.Mongoose;

export const Setup = () : Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const config = GetConfig<MainConfig>("main");

    mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
      console.log("Established connection with database.");

      Database = client;
      resolve();
    }).catch(e => {
      reject(new Error("Failed to connect to database! Error: " + e.message));
    });
  });
};