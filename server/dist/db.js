"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectMongoose = () => {
    mongoose_1.default
        .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.4oe6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test`)
        .then((e) => {
        console.log(`Connected to mongoDB: ${e.connection.host}`);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.connectMongoose = connectMongoose;
//# sourceMappingURL=db.js.map