import "./lib/db";
import path from "path";
import express from "express";
import cardRoutes from "./routes/card";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index")
});

app.use("/cards", cardRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
