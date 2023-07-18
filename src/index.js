import express from "express";
import prisma from "@prisma/client";
const app = express();
const db = new prisma.PrismaClient();
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "pug");

app.get("/:id", (req, res) => {
  res.render("index", db.dat.findUnique({ where: { id: req.params.id } }));
});
app.post("/", (req, res) => {
  const data = req.body;
  const d = db.dat.create({ data });
  res.send(d);
});
app.listen(8080, () => {
  db.$connect();
  console.log("server started in http://localhost:8080");
});
