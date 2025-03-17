const express = require("express")
const router = express.Router()

router.use("/api", require("./products"))
router.use("/api", require("./categories"))
router.use("/api", require("./stock"))
router.use("/api", require("./administrators"))


router.use("/api", require("./populate"))


module.exports = router
