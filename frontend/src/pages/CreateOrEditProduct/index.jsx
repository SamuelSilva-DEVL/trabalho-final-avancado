import React, { useEffect, useState } from "react"
import {
  TextField,
  Button,
  Grid,
  Typography,
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
import { getCategories } from "../../services/categoriesSevices"
import { toast } from "react-toastify"

export function CreateOrEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: 0,
    quantity_stock: 0,
    image: "",
    categoryId: 0,
  })

  const [optionsCategories, setCategories] = useState([])

  const fetchCategories = async () => {
    const fetch = await getCategories()
    setCategories(fetch)
  }

  const handleChange = async (e) => {
    const { name, value } = e.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const createNewProduct = async () => {
    const data = {
      product_name: formData.product_name,
      description: formData.description,
      price: formData.price,
      quantity_stock: formData.quantity_stock,
      categoryId: formData.categoryId,
      image: formData.image,
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
      price: formData.price,
      quantity_stock: formData.quantity_stock,
      categoryId: formData.categoryId,
      image: formData.image,
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
        price: product.price,
        quantity_stock: product.quantity_stock,
        categoryId: product.categoryId,
        image: product.image,
      }

      setFormData(data)
    }
  }

  useEffect(() => {
    fetchCategories()
    if (id) {
      fetchProductById(id)
    }
  }, [id])

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Editar Produto" : "Cadastrar Produto"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Url Imagem"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

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
            name="price"
            type="number"
            value={formData.price}
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
              <MenuItem key={option.name} value={option.id}>
                {option.name}
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
