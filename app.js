const express = require("express");
const userRoutes = require("./api/routes/users");
const departmentRoutes = require("./api/routes/departments")

const app = express()

app.use('/users', userRoutes);
app.use('/departments', departmentRoutes);

module.exports = app;