const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routers
const indexRouter = require("./routes/indexRouter");
const typesRouter = require("./routes/typesRouter");
const brandsRouter = require("./routes/brandsRouter");
const carsRouter = require("./routes/carsRouter");

app.use("/", indexRouter);
app.use("/types", typesRouter);
app.use("/brands", brandsRouter);
app.use("/car", carsRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => console.log("Server running on port: " + PORT));
