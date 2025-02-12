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
import { v4 as uuidv4 } from "uuid"
import { addProductForCategorie, updateProductForCategorie } from "@utils"

const optionsCategories = [
  {
    id: 1,
    label: "Tênis para corrida",
    value: "tenis-para-corrida",
  },
  {
    id: 2,
    label: "Tênis para academia",
    value: "tenis-para-academia",
  },
  {
    id: 3,
    label: "Sneakers",
    value: "sneakers",
  },
]

export function CreateOrEditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    value: 0,
    stock: 0,
    image: null,
    categorie: "",
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!id) {
      const productId = uuidv4()

      const productData = { id: productId, ...formData }

      storedProducts.push(productData)

      localStorage.setItem("produtos", JSON.stringify(storedProducts))

      addProductForCategorie(productData)
    } else {
      const productIndex = storedProducts.findIndex((p) => p.id === id)

      const oldInformations = storedProducts[productIndex]

      if (productIndex !== -1) {
        storedProducts[productIndex] = {
          ...storedProducts[productIndex],
          ...formData,
        }

        localStorage.setItem("produtos", JSON.stringify(storedProducts))

        updateProductForCategorie(storedProducts[productIndex], oldInformations)
      }
    }

    navigate("/administrador")
  }

  useEffect(() => {
    if (id) {
      const product = storedProducts.find((p) => p.id === id)

      if (product) {
        const data = {
          name: product.name,
          description: product.description,
          value: product.value,
          stock: product.stock,
          image: product.image,
          categorie: product.categorie,
        }

        setFormData(data)
      }
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
            name="name"
            value={formData.name}
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
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Quantidade em estoque"
            name="stock"
            type="number"
            defaultValue={1}
            value={formData.stock}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <FormControl fullWidth sx={{ mt: 2, ml: 2 }}>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
            disabled={id.toString() !== null || undefined || "" || false}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categoria"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
          >
            {optionsCategories.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
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
