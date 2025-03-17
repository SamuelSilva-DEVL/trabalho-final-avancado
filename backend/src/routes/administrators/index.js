const express = require("express");
const router = express.Router();
const adminController = require('../../controllers/adminController')

// router.post("/admin/login", adminController.userLogin);

router.get("/admin", adminController.getUsers);
router.get("/admin/:id", adminController.getUserById);
router.post("/admin", adminController.createUser);
router.put("/admin/:id", adminController.updateUser);
router.delete("/admin/:id", adminController.deleteUser);

module.exports = router;