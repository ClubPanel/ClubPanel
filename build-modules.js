const child_process = require("child_process");
const fs = require("fs-extra");
const Path = require("path");

for (let module of fs.readdirSync("./modules")) {
  const modulePath = Path.join("./modules", module);
  const nodeModulesPath = Path.join(modulePath, "node_modules");

  fs.ensureDirSync(nodeModulesPath);

  child_process.execSync("npm i", {cwd: modulePath});

  fs.copySync(nodeModulesPath, "node_modules");

  child_process.execSync("tsc", {cwd: modulePath});

  fs.emptyDirSync(nodeModulesPath);
  fs.rmdirSync(nodeModulesPath);
}