import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRouter)
app.all("*", (req,res) =>{
    res.status(404).json({message: 'end point does not exist'})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }else {
    console.log(`Server is running on port ${PORT}`);
    }
});