import express from "express";
import morgan from "morgan";
import fs from "fs";
import libroController from "./libro/controller.js";
import prestamoController from "./prestamo/controller.js";

const app = express();

const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", libroController);
app.use("/", prestamoController);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});