const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const UsersControllers = require("../controllers/users");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const User = require("../models/userModels");

router.get("/", UsersControllers.users_get_all);

router.post("/", checkAuth, upload.single("image"), UsersControllers.users_create_user);

router.get("/:userId", UsersControllers.users_get_user);

router.patch("/:userId", checkAuth, UsersControllers.users_update_user);

router.delete("/:userId", checkAuth, UsersControllers.users_delete_user);

module.exports = router;
