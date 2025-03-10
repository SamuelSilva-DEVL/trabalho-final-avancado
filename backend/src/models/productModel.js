const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Products = prisma.products

module.exports = { Products }
