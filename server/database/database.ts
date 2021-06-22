import {GetConfig} from "../../shared/config/configStore";
import {MainConfigServer} from "../../shared/config/types/mainConfig";
import mongoose from "mongoose";

export const Setup = () : Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const config = GetConfig<MainConfigServer>("server/main.json");

    mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log("Established connection with database.");

      resolve();
    }).catch(e => {
      reject(new Error("Failed to connect to database! Error: " + e.message));
    });
  });
};