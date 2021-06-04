const child_process = require("child_process");
const fs = require("fs");
const Path = require("path");

for (let module of fs.readdirSync("./modules")) {
  child_process.exec("tsc", {cwd: Path.join("./modules", module)}, () => {});
}