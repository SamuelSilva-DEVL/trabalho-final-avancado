const express = require("express")
const router = express.Router()

router.use("/api", require("./products"))
router.use("/api", require("./categories"))


module.exports = router
