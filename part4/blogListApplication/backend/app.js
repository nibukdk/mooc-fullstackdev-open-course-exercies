const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/routes");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
