const prisma = require("../config/prismaClient");

exports.getProducts = async (req, res) => {
    try {
        const todosProdutos = await prisma.products.findMany();
        res.status(200).json(todosProdutos);
    } catch (error) {
        console.error("erro ao buscar produtos:", error)
        res.status(500).json({error: 'Erro ao buscar produtos'});
    }
};

exports.getProductsById = async (req, res) => {
    const {id} = req.params;

    try {
        const produtoPorId = await prisma.products.findUnique({
            where: { id: Number(id)},
        });
        if (produtoPorId) {
            res.status(200).json(produtoPorId);
        } else {
            res.status(404).json({message: 'Produto não encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar o produto'});
    }
};

exports.createProduct = async (req, res) => {
    const {type, quantity, price, image, categoryId} = req.body
    try {
        const novoProduto = await prisma.products.create({
            data: {
                type,
                quantity,
                price,
                image,
                categoryId
            },
        });
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({error: 'Erro ao adicionar produto'})
    }
};

exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    const {type, quantity, price, image, categoryId} = req.body;
    try {
        const produtoEditado = await prisma.products.update({
            where: {id: Number(id)},
            data: {
                type,
                quantity,
                price,
                image,
                categoryId
            },
    });
        res.status(200).json(produtoEditado);

    } catch (error) {
        res.status(404).json({error: 'Produto não encontrado'});
    }
};


exports.deleteProducts = async (req, res) => {
    const {id} = req.params;
    try {
        await prisma.products.delete({
            where: {id: Number(id)},
        });
        res.status(204).send();
    } catch (error) {
        res.status(404).jso({error: 'Produto não encontrado'})
    }
};