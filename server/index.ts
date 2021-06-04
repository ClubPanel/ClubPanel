import express from "express";
import next from "next";
import {LoadModules} from "../shared/module/moduleLoader";

const app = next({ dev: process.argv[2] === "dev" });
const handle = app.getRequestHandler();

app.prepare()
  .then(async () => {
    const server = express();

    const modules = await LoadModules(true);

    for (const module of modules) {
      if(!module.server) continue;

      module.server?.register(server);
    }

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