#!/usr/bin/env node
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
const index_1 = require("./index");
const args = require("minimist")(process.argv.slice(2), {
    alias: {
        cid: "client_id",
        tid: "tenant_id",
        ci: "continuous_integration_variable"
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () { return yield index_1.run(args.client_id, args.tenant_id, args.ci); }))();
//# sourceMappingURL=cli.js.map