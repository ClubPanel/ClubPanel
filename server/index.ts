import express from "express";
import next from "next";
import {LoadModules} from "../shared/module/moduleLoader";

const app = next({ dev: process.argv[2] === "dev" });
const handle = app.getRequestHandler();

app.prepare()
  .then(async () => {
    const server = express();

    await LoadModules(true);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(80, () => {
      console.log("> Ready on http://localhost:80");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });