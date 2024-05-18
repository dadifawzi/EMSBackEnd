const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const multer = require("multer");
const verifyToken = require("../config/auth/authMiddleWare");




let fileName = "";




//set Storage engine
const storage = multer.diskStorage({
  destination: "./storage",
  filename: function (req, file, redirect) {
    fileName =
      file.originalname.split(".")[0] +
      "-" +
      Date.now() +
      "." +
      file.mimetype.split("/")[1];
    redirect(null, fileName);
  },
});

//upload function
const upload = multer({
  storage: storage,
});

// Routes for user management
router.post("/create", upload.single("image"), (req, res) => {
  userController.createUser(req, res, fileName);
  fileName = "";
});
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", upload.single("image"), (req, res) => {
  userController.updateUserById(req, res, fileName);
  fileName = "";
});
router.delete("/:id", userController.deleteUserById);

// Routes for authentication
router.post("/signin", userController.signIn);

module.exports = router;
