const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Admin = prisma.users

module.exports = { Admin }