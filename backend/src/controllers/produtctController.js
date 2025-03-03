const prisma = require("../config/prismaClient");

exports.getProducts = async (req, res) => {
    try {
        const Produtos = await prisma.products.findMany();
        res.status(200).json(Produtos);
    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar produtos'})
    }
};

exports.getProductsById = async (req, res) => {
    try {

    } catch (error) {

    }
};

exports.createProduct = async (req, res) => {
    try {

    } catch (error) {

    }
};

exports.updateProduct = async (req, res) => {
    try {

    } catch (error) {

    }
};

exports.getProducts = async (req, res) => {
    try {

    } catch (error) {

    }
};

exports.deleteProducts = async (req, res) => {
    try {

    } catch (error) {

    }
};