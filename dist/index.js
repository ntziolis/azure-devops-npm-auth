"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const authentication_1 = require("./authentication");
const npm_config_1 = require("./npm-config");
const AZDEVOPS_RESOURCE_ID = "499b84ac-1321-427f-aa17-267ca6975798";
const AZDEVOPS_AUTH_CLIENT_ID = "f9d5fef7-a410-4582-bb27-68a319b1e5a1";
const AZDEVOPS_AUTH_TENANT_ID = "common";
const CI_DEFAULT_ENV_VARIABLE_NAME = "TF_BUILD";
const userNpmConfig = new npm_config_1.UserNpmConfig();
const projectNpmConfig = new npm_config_1.ProjectNpmConfig();
function inCI(ciInfo) {
    if (!ciInfo) {
        return false;
    }
    const variableName = typeof ciInfo === "string" ? ciInfo : CI_DEFAULT_ENV_VARIABLE_NAME;
    if (!process.env[variableName]) {
        return false;
    }
    console.log("Skipped auth due to running in CI environment");
    return true;
}
exports.inCI = inCI;
function run(clientId = AZDEVOPS_AUTH_CLIENT_ID, tenantId = AZDEVOPS_AUTH_TENANT_ID, ciInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        if (inCI(ciInfo)) {
            return;
        }
        for (const registry of getRegistries()) {
            console.log(chalk.green(`found registry ${registry}`));
            const issuer = yield authentication_1.MsoIssuer.discover(tenantId);
            const client = new issuer.Client(new authentication_1.MsoDeviceCodeClientMedata(clientId));
            let tokenSet;
            const refreshToken = userNpmConfig.getRegistryRefreshToken(registry);
            if (refreshToken) {
                try {
                    console.log("Trying to use refresh token...");
                    tokenSet = yield client.refresh(refreshToken);
                }
                catch (exception) {
                    switch (exception.error) {
                        case "invalid_grant":
                            console.log(chalk.yellow("Refresh token is invalid or expired."));
                            tokenSet = yield startDeviceCodeFlow(client);
                            break;
                        case "interaction_required":
                            console.log(chalk.yellow("Interaction required."));
                            tokenSet = yield startDeviceCodeFlow(client);
                            break;
                        default:
                            throw exception;
                    }
                }
            }
            else {
                tokenSet = yield startDeviceCodeFlow(client);
            }
            // Update user npm config with tokens
            userNpmConfig.setRegistryAuthToken(registry, tokenSet.access_token);
            userNpmConfig.setRegistryRefreshToken(registry, tokenSet.refresh_token);
            console.log(chalk.green(`Done! You can now install packages from ${registry} \n`));
        }
    });
}
exports.run = run;
function startDeviceCodeFlow(client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.green("launching device code authentication..."));
        // Make sure to include 'offline_access' scope to receive refresh token.
        const handle = yield client.deviceAuthorization({
            scope: `${AZDEVOPS_RESOURCE_ID}/.default offline_access`
        });
        console.log(`To sign in, use a web browser to open the page ${handle.verification_uri} and enter the code ${handle.user_code} to authenticate.`);
        return yield handle.poll();
    });
}
function getRegistries() {
    // Registries should be set on project level but fallback to user defined.`
    const projectRegistries = projectNpmConfig.getRegistries();
    const userRegistries = userNpmConfig.getRegistries();
    const registries = (projectRegistries.length !== 0
        ? projectRegistries
        : userRegistries)
        // return unique list of registries
        .filter((key, index, keys) => index === keys.indexOf(key));
    if (registries.length === 0) {
        throw new Error("No private registry defined in project .npmrc or user defined .npmrc.");
    }
    return registries;
}
//# sourceMappingURL=index.js.map