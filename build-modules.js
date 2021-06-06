const child_process = require("child_process");
const fs = require("fs");
const Path = require("path");
const ncp = require("ncp").ncp;

ncp.limit = 16;

for (let module of fs.readdirSync("./modules")) {
  child_process.exec("npm i", {cwd: Path.join("./modules", module)}, () => {});

  ncp(Path.join("./modules", module, "node_modules"), "node_modules");

  child_process.exec("tsc", {cwd: Path.join("./modules", module)}, () => {});
}