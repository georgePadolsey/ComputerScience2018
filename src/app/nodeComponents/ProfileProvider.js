import fs from "fs";
import path from "path";

function copyFile(source, target, cb) {
  var cbCalled = false;
  console.dir(source, target);

  var rd = fs.createReadStream(source);
  rd.on("error", err => {
    done(err);
  });
  fs.writeFile(target, rd, { flag: "wx" }, done);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

export default class ProfileProvider {
  constructor(
    configFilePath,
    defaultConfigFilePath = "config/profiles.default.json"
  ) {
    console.log(__dirname, defaultConfigFilePath);
    this._configFilePath = path
      .join(__dirname, "..", configFilePath)
      .toString();
    this._defaultConfigFilePath = path
      .join(__dirname, "..", defaultConfigFilePath)
      .toString();
    console.log(process.version);
    console.log(fs.copyFile);
    copyFile(this._defaultConfigFilePath, this._configFilePath, err => {
      if (err) {
        console.log("[ProfileProvider] config present");
        return;
      }

      console.info("[ProfileProvider] config regenerated");
    });
    fs.access(
      this._defaultConfigFilePath,
      fs.constants.R_OK | fs.constants.W_OK,
      err => {
        if (err) throw new Error("Default config file is invalid");
      }
    );
  }
}
