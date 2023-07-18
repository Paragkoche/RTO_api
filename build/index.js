"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("@prisma/client"));
const app = (0, express_1.default)();
const db = new client_1.default.PrismaClient();
app.use(express_1.default.static(__dirname + "\\public"));
app.set("views", __dirname + "\\views");
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
