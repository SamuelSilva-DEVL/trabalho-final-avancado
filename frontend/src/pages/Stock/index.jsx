import { useEffect, useState } from "react"
import BasicTable from "../../components/Table"
import styles from "../Products/styles.module.css"
import { getStock } from "../../services/stockServices"

const headers = [
  { field: "categoryName", headerName: "Categoria produto" },
  { field: "totalStock", headerName: "Quantidade em estoque" },
  { field: "averageValues", headerName: "Valor médio" },
]

export function Stock() {
     const [stock, setStock] = useState([])

const fetchStock = async () => {
      const fetch = await getStock();
      setStock(fetch);
    }
  
  useEffect(() => {
    fetchStock();
  }, [])

  return (
    <section style={{ padding: "20px" }}>
      <div className={styles["content-header"]}>
        <h2>Estoque</h2>
      </div>

      <BasicTable headers={headers} rows={stock} />
    </section>
  )
}
