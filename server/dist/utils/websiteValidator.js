"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidWebsite = void 0;
const validator_1 = __importDefault(require("validator"));
const isValidWebsite = (website) => {
    return validator_1.default.isURL(website, {
        protocols: ['http', 'https'],
        require_protocol: true
    });
};
exports.isValidWebsite = isValidWebsite;
//# sourceMappingURL=websiteValidator.js.map