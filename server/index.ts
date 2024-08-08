import express from "express";
import bodyParser from 'body-parser';
import { connectMongoose } from "./db";
import cors from "cors";
import companyRoutes from './routes/companyManagementRoutes';
import adminRoutes from './routes/adminManagementRoutes';
import employeesRoutes from './routes/employeesManagment';
import serviceRoutes from './routes/serviceUserManagement';
import visitRoutes from './routes/visitManagementRoutes';
import runRoutes from './routes/runManagemnetRoutes';



const app = express();
app.use(cors({
    origin: '*',
    methods: ["GET", "POST"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
connectMongoose();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/companies', companyRoutes);
app.use('/admins', adminRoutes);
app.use('/employees', employeesRoutes);
app.use("/service-users",serviceRoutes);
app.use("/visits",visitRoutes);
app.use("/runs",runRoutes);


app.listen(process.env.PORT || 3000, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});