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
const openid_client_1 = require("openid-client");
class MsoIssuer extends openid_client_1.Issuer {
    // See documentation: 
    // https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc#fetch-the-openid-connect-metadata-document
    static discover(tenant = "common") {
        return __awaiter(this, void 0, void 0, function* () {
            const issuer = yield openid_client_1.Issuer.discover(`https://login.microsoftonline.com/${tenant}/v2.0/.well-known/openid-configuration`);
            // Add the missing device code endpoint
            Object.assign(issuer, {
                device_authorization_endpoint: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/devicecode`
            });
            return issuer;
        });
    }
}
exports.default = MsoIssuer;
//# sourceMappingURL=mso-issuer.js.map