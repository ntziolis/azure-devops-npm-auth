"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MsoDeviceCodeClientMedata {
    constructor(clientId) {
        // Defaulted values for device flow
        this.token_endpoint_auth_method = "none";
        this.response_types = ["code"];
        this.client_id = clientId;
    }
}
exports.default = MsoDeviceCodeClientMedata;
//# sourceMappingURL=mso-device-code-client-metadata.js.map