import React, { useEffect, useState } from "react"
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import {
  createProduct,
  getProductbyId,
  updateProduct,
} from "../../services/productsServices"
import {
  getCategories,
  getCategoriesById
}
from "../../services/categoriesSevices"
import { toast } from "react-toastify"


export function CreateOrEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    valor: 0,
    quantity_stock: 0,
    image: null,
    categoryId: 0,
  })

  const [optionsCategories, setCategories] = useState ([]);

  const fetchCategories = async () => {
    const fetch = await getCategories();
    setCategories(fetch);
  }

  const storedProducts = JSON.parse(localStorage.getItem("produtos")) || []

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    if (name === "image") {
      const file = e.target.files ? e.target.files[0] : null

      const imageData = {
        name: file.name,
        urlImage: await convertToBase64(file),
      }

      setFormData((prevState) => ({
        ...prevState,
        image: imageData,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const createNewProduct = async () => {
    const data = {
      product_name: formData.product_name,
      description: formData.description,
      valor: formData.valor,
      quantity_stock: formData.quantity_stock,
      categoryId: formData.categoryId,
    }

    await createProduct(data).then(() => {
      toast.success("Produto cadastrado com sucesso!")

      navigate("/administrador")
    })
  }

  const editProduct = async () => {
    const data = {
      product_name: formData.product_name,
      description: formData.description,
      valor: formData.valor,
      quantity_stock: formData.quantity_stock,
      categoryId: formData.categoryId,
    }

    await updateProduct(id, data).then(() => {
      toast.success("Produto editado com sucesso!")

      navigate("/administrador")
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!id) {
      createNewProduct()
    } else {
      editProduct()
    }

    // navigate("/administrador")
  }

  const fetchProductById = async (id) => {
    const response = await getProductbyId(id)

    if (response) {
      const product = response.data

      const data = {
        product_name: product.product_name,
        description: product.description,
        valor: product.valor,
        quantity_stock: product.quantity_stock,
        categoryId: product.categoryId,
      }

      setFormData(data)
    }
  }

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProductById(id)
    }
  }, [id])

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Editar Produto" : "Cadastrar Produto"}
      </Typography>

      <Grid item xs={12}>
        <label
          htmlFor="image"
          style={{ fontFamily: "Helvetica medium, sans-serif" }}
        >
          Imagem do Produto
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "block", margin: "16px 0" }}
        />
        {formData.image && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {formData.image.name}
            </Typography>
            <Box
              component="a"
              href={formData.image.urlImage}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: "inline-block", marginTop: "8px" }}
            >
              <Typography variant="body2" color="primary">
                Ver imagem
              </Typography>
            </Box>
          </div>
        )}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome do Produto"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Valor"
            name="valor"
            type="number"
            value={formData.valor}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Quantidade em estoque"
            name="quantity_stock"
            type="number"
            defaultValue={1}
            value={formData.quantity_stock}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <FormControl fullWidth sx={{ mt: 2, ml: 2 }}>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categoria"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            {optionsCategories.map((option) => (
              <MenuItem key={option.nome} value={option.id}>
                {option.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
