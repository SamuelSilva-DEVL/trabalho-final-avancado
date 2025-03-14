import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BasicTable from "../../components/Table"
import Button from "@mui/material/Button"
import { deleteProductForCategorie } from "@utils"
import { getProducts, deleteProduct } from "../../services/productsServices"

import styles from "./styles.module.css"

const headers = [
  { field: "product_name", headerName: "Produto" },
  { field: "categoryName", headerName: "Categoria" },
  { field: "description", headerName: "Descrição" },
  { field: "valor", headerName: "Valor" },
  { field: "quantity_stock", headerName: "Quantidade em estoque" },
  { field: "actions", headerName: "Ações" },
]

export function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchListProducts = async () => {
    setIsLoading(true)
    try {
      const response = await getProducts()

      setProducts(response)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProductInTable = async (productData) => {
    await deleteProduct(productData.id)

    fetchListProducts()
  }

  useEffect(() => {
    fetchListProducts()
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
          deleteProduct={deleteProductInTable}
        />
      )}
    </section>
  )
}
