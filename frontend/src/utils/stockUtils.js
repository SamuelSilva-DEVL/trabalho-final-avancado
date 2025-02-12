import { v4 as uuidv4 } from "uuid"

export function deleteProductForCategorie(product) {
  const stockData = JSON.parse(localStorage.getItem("stock")) || []

  if (stockData.length > 0) {
    const stockIndex = stockData.findIndex(
      (s) => s.categorie === product.categorie
    )

    if (stockIndex !== -1) {
      const newAverageValue =
        Number(stockData[stockIndex].averageValue) *
          Number(stockData[stockIndex].numberOfTYpes) -
        Number(product.value)

      const newData = {
        ...stockData[stockIndex],
        numberOfTYpes: stockData[stockIndex].numberOfTYpes - 1,
        averageValue:
          Number(newAverageValue) /
          Number(stockData[stockIndex].numberOfTYpes - 1),
        number: Number(stockData[stockIndex].number) - Number(product.stock),
      }

      localStorage.setItem("stock", JSON.stringify(newData))
    }
  }
}

export function addProductForCategorie(product) {
  const stockData = JSON.parse(localStorage.getItem("stock")) || []

  if (stockData.length > 0) {
    const stockIndex = stockData.findIndex(
      (s) => s.categorie === product.categorie
    )

    if (stockIndex !== -1) {
      const newAverageValue =
        Number(stockData[stockIndex].averageValue) *
          Number(stockData[stockIndex].numberOfTYpes) +
        Number(product.value)

      stockData[stockIndex] = {
        ...stockData[stockIndex],
        numberOfTYpes: stockData[stockIndex].numberOfTYpes + 1,
        averageValue:
          Number(newAverageValue) /
          Number(stockData[stockIndex].numberOfTYpes + 1),
        number: Number(stockData[stockIndex].number) + Number(product.stock),
      }

      localStorage.setItem("stock", JSON.stringify(stockData))
    }
  } else {
    const stockId = uuidv4()

    const dataStock = {
      id: stockId,
      categorie: product.categorie,
      averageValue: product.value,
      number: product.stock,
      numberOfTYpes: 1,
    }

    const storedStock = [dataStock]

    localStorage.setItem("stock", JSON.stringify(storedStock))
  }
}

export function updateProductForCategorie(product, oldInformations) {
  const stockData = JSON.parse(localStorage.getItem("stock")) || []

  if (stockData.length > 0) {
    const stockIndex = stockData.findIndex(
      (s) => s.categorie === product.categorie
    )

    if (stockIndex !== -1) {
      const averageValueWithoutOldValue =
        Number(stockData[stockIndex].averageValue) *
          Number(stockData[stockIndex].numberOfTYpes) -
        Number(oldInformations.value)

      const averageValueWithNewValue =
        Number(averageValueWithoutOldValue) + Number(product.value)

      const numberWithoutOldValue =
        Number(stockData[stockIndex].number) - Number(oldInformations.stock)

      stockData[stockIndex] = {
        ...stockData[stockIndex],
        averageValue:
          Number(averageValueWithNewValue) /
          Number(stockData[stockIndex].numberOfTYpes),
        number: Number(numberWithoutOldValue) + Number(product.stock),
      }
    }
  }
}
