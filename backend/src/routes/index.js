const express = require("express")
const router = express.Router()

router.use("/api", require("./products"))

module.exports = router
