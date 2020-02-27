"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const path = require("path");
const ini_config_1 = require("./ini-config");
const child_process_1 = require("child_process");
class NpmConfig extends ini_config_1.default {
    constructor(basePath, createIfNotExists = false) {
        if (!basePath) {
            throw new Error("No base path defined for .npmrc file.");
        }
        if (!basePath.endsWith(".npmrc")) {
            basePath = path.join(basePath, ".npmrc");
        }
        super(basePath, createIfNotExists);
    }
    getRegistries() {
        return Object.keys(this.config)
            .filter(key => key.includes("registry"))
            .map(key => this.get(key));
    }
    ;
    getRegistryRefreshToken(registry) {
        const registryUrl = url.parse(registry);
        return this.get(`//${registryUrl.hostname}${registryUrl.pathname}:_refreshToken`);
    }
    setRegistryAuthToken(registry, token) {
        const registryUrl = url.parse(registry);
        this.set(`//${registryUrl.hostname}${registryUrl.pathname}:_authToken`, token);
        this.save();
    }
    setRegistryRefreshToken(registry, token) {
        const registryUrl = url.parse(registry);
        this.set(`//${registryUrl.hostname}${registryUrl.pathname}:_refreshToken`, token);
        this.save();
    }
}
exports.NpmConfig = NpmConfig;
class UserNpmConfig extends NpmConfig {
    constructor(createIfNotExists = true) {
        const filePath = child_process_1.execSync("npm config get userconfig")
            .toString()
            .trim();
        super(filePath, createIfNotExists);
    }
}
exports.UserNpmConfig = UserNpmConfig;
class ProjectNpmConfig extends NpmConfig {
    constructor() {
        const filePath = path.join(process.cwd(), ".npmrc");
        super(filePath);
    }
}
exports.ProjectNpmConfig = ProjectNpmConfig;
//# sourceMappingURL=index.js.map