import {Db, MongoClient} from "mongodb";
import {GetConfig} from "../config/configManager";
import {MainConfig} from "../config/types/mainConfig";

export let Database: Db;

export const Setup = () : Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const config = GetConfig<MainConfig>("main");

    const client = new MongoClient(config.dbURL);

    client.connect(function(err) {
      if(err) return reject(new Error("Failed to connect to database! Error: " + err.message));

      console.log("Established connection with database");

      Database = client.db(config.dbName);

      resolve();
    });
  });
};