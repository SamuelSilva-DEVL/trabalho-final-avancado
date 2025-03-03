const prisma = require("../config/prismaClient");


exports.getCategories = async (req, res) => {
    try {
        const todasCategorias = await prisma.categories.findMany();
        res.status(200).json(todasCategorias);
    } catch (error) {
        console.error("erro ao buscar produtos:", error)
        res.status(500).json({error: 'Erro ao buscar produtos'});
    }
};

exports.getCategoriesById = async (req, res) => {
    const {id} = req.params;

    try {
        const categoriaPorId = await prisma.categories.findUnique({
            where: { id: Number(id)},
        });
        if (categoriaPorId) {
            res.status(200).json(categoriaPorId);
        } else {
            res.status(404).json({message: 'Produto não encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar o produto'});
    }
};

exports.createCategory = async (req, res) => {
    const {nome} = req.body
    try {
        const novaCategoria = await prisma.categories.create({
            data: {
                nome
            },
        });
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).json({error: 'Erro ao adicionar produto'})
    }
};

exports.updateCategory = async (req, res) => {
    const {id} = req.params;
    const { nome } = req.body;
    try {
        const categoriaEditada = await prisma.categories.update({
            where: {id: Number(id)},
            data: {
                nome
            },
    });
        res.status(200).json(categoriaEditada);

    } catch (error) {
        res.status(404).json({error: 'Produto não encontrado'});
    }
};


exports.deleteCategories = async (req, res) => {
    const {id} = req.params;
    try {
        await prisma.categories.delete({
            where: {id: Number(id)},
        });
        res.status(204).send();
    } catch (error) {
        res.status(404).jso({error: 'Produto não encontrado'})
    }
};