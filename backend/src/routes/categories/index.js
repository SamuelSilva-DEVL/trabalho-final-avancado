const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  getCategoriesById,
  updateCategory,
  deleteCategories,
} = require("../../controllers/categoriesController");

router.get("/categories", async (req, res) => {
  const data = await getCategories();

  res.status(200).json(data);
});

router.get("/categories/:id", async (req, res) => {
  const id_categories = parseInt(req.params.id);

  const findCategory = await getCategoriesById(id_categories);

  if (!findCategory) {
    return res.status(404).json({ message: "Categoria não encontrada." });
  }

  res.status(200).json(findCategory);
});

router.post("/categories", async (req, res) => {
  const data = await createCategory(req.body);

  res.status(200).json(data);
});

router.put("/categories/:id", async (req, res) => {
  const id_categories = parseInt(req.params.id);

  const findCategory = await getCategoriesById(id_categories);

  if (!findCategory) {
    return res.status(404).json({ message: "Categoria não encontrado." });
  }

  const dataUpdate = await updateCategory(id_categories, req.body);

  res
    .status(200)
    .json({ message: "Categoria atualizada com sucesso", data: dataUpdate });
});

router.delete("/categories/:id", async (req, res) => {
  const id_categories = parseInt(req.params.id);

  try {
    const findCategory = await getCategoriesById(id_categories);

    if (!findCategory) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    await deleteCategories(id_categories);

    res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao apagar a Categoria", error });
  }
});

module.exports = router;
