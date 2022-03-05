import express from "express";
import { json } from "express";
import cors from "cors";
import router from "./routes/index.js";

const PORT = 4000;

const app = express();
app.use(cors());
app.use(json());

app.use(router);

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
});