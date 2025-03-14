const express = require("express")
const app = express()
const cors = require("cors")
const routes = require("./routes")

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use("/", routes)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = {app, server};