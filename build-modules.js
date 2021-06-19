const child_process = require("child_process");
const fs = require("fs-extra");
const Path = require("path");

for (let module of fs.readdirSync("./modules")) {
  console.log("Building " + module);

  const modulePath = Path.join("./modules", module);
  const nodeModulesPath = Path.join(modulePath, "node_modules");

  fs.ensureDirSync(nodeModulesPath);

  try {
    child_process.execSync("npm i", {cwd: modulePath});
  }
  catch(e){
    throw new Error("Error in npm install (" + modulePath + "): \n" + e.stdout.toString("utf-8") + "\n" + e.stderr.toString("utf-8"));
  }

  fs.copySync(nodeModulesPath, "node_modules");

  try {
    child_process.execSync("tsc", {cwd: modulePath});
  }
  catch(e){
    throw new Error("Error in typescript (" + modulePath + "): \n" + e.stdout.toString("utf-8") + "\n" + e.stderr.toString("utf-8"));
  }

  fs.emptyDirSync(nodeModulesPath);
  fs.rmdirSync(nodeModulesPath);
}