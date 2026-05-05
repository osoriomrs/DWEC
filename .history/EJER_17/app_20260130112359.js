import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import albumRouter from "./album/controller.js";
import artistaRouter from "./artista/controller.js";

const app = express();

const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("styles"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

app.use("/albumes", albumRouter);
app.use("/artistas", artistaRouter);

app.listen(3000);
