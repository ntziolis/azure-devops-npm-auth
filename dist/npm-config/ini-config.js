"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ini = require("ini");
class IniConfig {
    constructor(filePath, createIfNotExists = false) {
        this.get = (key) => this.config[key];
        this.set = (key, value) => this.config[key] = value;
        this.save = () => fs.writeFileSync(this.filePath, ini.encode(this.config));
        this.load = () => this.config = ini.parse(fs.readFileSync(this.filePath, "utf8"));
        if (!fs.existsSync(filePath)) {
            if (createIfNotExists) {
                fs.writeFileSync(filePath, {});
            }
            else {
                throw new Error(`Configuration file at '${filePath}' doesn't exist.`);
            }
        }
        this.filePath = filePath;
        this.config = {};
        this.load();
    }
}
exports.default = IniConfig;
//# sourceMappingURL=ini-config.js.map