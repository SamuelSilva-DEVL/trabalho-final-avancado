const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Stock = prisma.products

module.exports = { Stock }