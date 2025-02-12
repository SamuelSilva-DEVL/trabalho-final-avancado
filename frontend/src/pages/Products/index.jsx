import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BasicTable from "../../components/Table"
import Button from "@mui/material/Button"
import { deleteProductForCategorie } from "@utils"

import styles from "./styles.module.css"

const headers = [
  { field: "product", headerName: "Produto" },
  { field: "categorie", headerName: "Categoria" },
  { field: "description", headerName: "Descrição" },
  { field: "value", headerName: "Valor" },
  { field: "stock", headerName: "Quantidade em estoque" },
  { field: "actions", headerName: "Ações" },
]

export function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const listProducts = JSON.parse(localStorage.getItem("produtos")) || []

  const updateItemsTable = (list) => {
    setIsLoading(true)

    //simulando um loading para atualizar estado da tabela
    setTimeout(() => {
      const rows =
        list.map((product) => ({
          id: product.id,
          product: product.name,
          description: product.description,
          value: product.value,
          stock: product.stock,
          categorie: product.categorie,
        })) ?? []

      setProducts(rows)
      setIsLoading(false)
    }, 2 * 1000)
  }

  const deleteProduct = (productData) => {
    const newProducts = listProducts.filter(
      (product) => product.id !== productData.id
    )
    localStorage.setItem("produtos", JSON.stringify(newProducts))

    deleteProductForCategorie(productData)

    updateItemsTable(newProducts)
  }

  useEffect(() => {
    updateItemsTable(listProducts)
  }, [])

  return (
    <section style={{ padding: "20px" }}>
      <div className={styles["content-header"]}>
        <h2>Produtos registrados</h2>

        <Button
          title="Cadastrar produto"
          variant="contained"
          color="primary"
          onClick={() => navigate("/administrador/cadastrar-produto")}
        >
          Cadastrar produto
        </Button>
      </div>

      {isLoading && <p>Carregando...</p>}

      {!isLoading && (
        <BasicTable
          headers={headers}
          rows={products}
          routeEdition="/administrador/editar-produto"
          deleteProduct={deleteProduct}
        />
      )}
    </section>
  )
}
