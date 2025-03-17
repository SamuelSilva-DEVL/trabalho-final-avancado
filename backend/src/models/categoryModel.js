const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Categories = prisma.categories

module.exports = { Categories }