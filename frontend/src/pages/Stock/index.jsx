import { useEffect, useState } from "react"
import BasicTable from "../../components/Table"
import styles from "../Products/styles.module.css"

const headers = [
  { field: "categoryName", headerName: "Categoria produto" },
  { field: "averageValue", headerName: "Valor médio" },
  { field: "totalStock", headerName: "Quantidade em estoque" },
]

export function Stock() {
  const [stock, setStock] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // const listStock = JSON.parse(localStorage.getItem("stock")) || []

  const updateItemsTable = (list) => {
    setIsLoading(true)

    //simulando um loading para atualizar estado da tabela
    setTimeout(() => {
      const rows =
        list.map((stock) => ({
          id: stock.id,
          categorie: stock.categorie,
          averageValue: stock.averageValue,
          number: stock.number,
        })) ?? []

      setStock(rows)
      setIsLoading(false)
    }, 2 * 1000)
  }
  useEffect(() => {
    updateItemsTable(listStock)
  }, [])

  return (
    <section style={{ padding: "20px" }}>
      <div className={styles["content-header"]}>
        <h2>Estoque</h2>
      </div>

      {isLoading && <p>Carregando...</p>}

      {!isLoading && <BasicTable headers={headers} rows={stock} />}
    </section>
  )
}
