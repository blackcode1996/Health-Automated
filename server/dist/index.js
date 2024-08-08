"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const companyManagementRoutes_1 = __importDefault(require("./routes/companyManagementRoutes"));
const adminManagementRoutes_1 = __importDefault(require("./routes/adminManagementRoutes"));
const employeesManagment_1 = __importDefault(require("./routes/employeesManagment"));
const serviceUserManagement_1 = __importDefault(require("./routes/serviceUserManagement"));
const visitManagementRoutes_1 = __importDefault(require("./routes/visitManagementRoutes"));
const runManagemnetRoutes_1 = __importDefault(require("./routes/runManagemnetRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ["GET", "POST"],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
(0, db_1.connectMongoose)();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/companies', companyManagementRoutes_1.default);
app.use('/admins', adminManagementRoutes_1.default);
app.use('/employees', employeesManagment_1.default);
app.use("/service-users", serviceUserManagement_1.default);
app.use("/visits", visitManagementRoutes_1.default);
app.use("/runs", runManagemnetRoutes_1.default);
app.listen(process.env.PORT || 3000, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map