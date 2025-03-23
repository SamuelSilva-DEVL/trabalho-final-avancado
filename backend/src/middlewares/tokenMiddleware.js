const { Admin } = require("../models/adminModel")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET ?? ""

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: "Não autorizado" })
    }

    const token = authorization.split(" ")[1]

    const { id } = jwt.verify(token, JWT_SECRET)

    const user = await Admin.findUnique({
      where: { id: String(id) },
    })

    if (!user) {
      return res.status(401).json({ error: "Não autorizado" })
    }

    const { password: _, ...loggedUser } = user

    req.user = loggedUser

    next()
  } catch (error) {
    return res.status(401).json({ error: "Não autorizado" })
  }
}

module.exports = { verifyToken }