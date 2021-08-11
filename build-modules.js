const child_process = require("child_process");
const fs = require("fs-extra");
const Path = require("path");

const imports = [];

fs.ensureDirSync("./modules");

for (let module of fs.readdirSync("./modules")) {
  console.log("Building " + module);

  const modulePath = Path.join("./modules", module);
  const nodeModulesPath = Path.join(modulePath, "node_modules");

  if(process.argv[2] !== "dev") {
    fs.ensureDirSync(nodeModulesPath);

    try {
      child_process.execSync("npm i", {cwd: modulePath});
    } catch (e) {
      throw new Error("Error in npm install (" + modulePath + "): \n" + e.stdout.toString("utf-8") + "\n" + e.stderr.toString("utf-8"));
    }

    fs.copySync(nodeModulesPath, "node_modules");

    fs.emptyDirSync(nodeModulesPath);
    fs.rmdirSync(nodeModulesPath);
  }

  try {
    child_process.execSync("tsc", {cwd: modulePath});
  } catch (e) {
    throw new Error("Error in typescript (" + modulePath + "): \n" + e.stdout.toString("utf-8") + "\n" + e.stderr.toString("utf-8"));
  }

  const scssPath = Path.join(modulePath, "styles", "index.scss");
  if(fs.existsSync(scssPath)) {
    imports.push(`@import "${Path.join("../", scssPath).replace(/\\/g, "/")}";`);
  }
}

fs.writeFileSync("./styles/moduleImports.scss", imports.join("\n"));