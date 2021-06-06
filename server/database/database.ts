import {GetConfig} from "../../shared/config/configManager";
import {MainConfig} from "../../shared/config/types/mainConfig";
import mongoose from "mongoose";

export const Setup = () : Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const config = GetConfig<MainConfig>("main");

    mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log("Established connection with database.");

      resolve();
    }).catch(e => {
      reject(new Error("Failed to connect to database! Error: " + e.message));
    });
  });
};