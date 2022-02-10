var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

var app = express();

var corsOptions = {
	origin: "http://localhost:4200",
	preflightContinue: false,
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

var appRouter = require("./app/routes/app.routes");
var authRouter = require("./app/routes/auth.routes");
var categoriesRouter = require("./app/routes/categories.routes");
var subcategoriesRouter = require("./app/routes/subcategories.routes");
var templatesRouter = require("./app/routes/templates.routes");
var usersRouter = require("./app/routes/users.routes");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "bin/ui")));

app.use("/app", appRouter);
app.use("/login", authRouter);
app.use("/categories", categoriesRouter);
app.use("/subcategories", subcategoriesRouter);
app.use("/templates", templatesRouter);
app.use("/users", usersRouter);

module.exports = app;
