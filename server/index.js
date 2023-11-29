import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = 8000
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("Miracle Miracle!!!");

    app.listen(PORT, ()=>{
        console.log(`Chal gaya server on port: ${PORT}`);
    })

}).catch(error => console.log(error));


app.use("/api", route);