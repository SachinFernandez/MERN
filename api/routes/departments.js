const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const DepartmentControllers = require("../controllers/departments");

router.get("/", checkAuth, DepartmentControllers.departments_get_all);

router.post("/", checkAuth, DepartmentControllers.departments_create_department);

router.get("/:departmentId", checkAuth, DepartmentControllers.departments_get_department);

router.delete("/:departmentId", checkAuth, DepartmentControllers.departments_delete_department);

module.exports = router;
