import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router/userAuth.js";
import 'dotenv/config'
import conectDB from './config/connection.js'

const app = express();
const PORT=process.env.PORT||5000
conectDB()
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
