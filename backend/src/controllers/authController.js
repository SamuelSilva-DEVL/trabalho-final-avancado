const { Admin } = require("../models/adminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET ?? ""

exports.signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await Admin.findUnique({
      where: { email: email },
    })

    if (!user) {
      return res.status(400).json({ error: "E-mail ou senha inválidos." })
    }

    const verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) {
      return res.status(400).json({ error: "E-mail ou senha inválidos." })
    }

    const payloadToken = {
      id: user.id,
    }

    const token = jwt.sign(payloadToken, JWT_SECRET, { expiresIn: "8h" })

    const { password: _, ...userLogin } = user

    const dataResult = {
      user: userLogin,
      token: token,
    }

    return res.status(200).json(dataResult)
  } catch (err) {}
}
