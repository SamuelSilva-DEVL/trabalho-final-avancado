import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Modal, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export default function BasicTable({
  headers,
  rows,
  routeEdition,
  deleteProduct,
}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [productSelected, setProductSelected] = useState(null)

  const handleOpenModal = (product) => {
    setProductSelected(product)
    setOpen(true)
  }
  const handleCloseModal = () => {
    setOpen(false)
    setProductSelected(null)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.field}>{header.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers?.map((header) => {
                if (header.field === "actions") {
                  return (
                    <TableCell key={header.field}>
                      <Button
                        variant="text"
                        onClick={() => navigate(`${routeEdition}/${row.id}`)}
                      >
                        Editar
                      </Button>
                      <Button
                        sx={{ color: "red" }}
                        variant="text"
                        onClick={() => {
                          handleOpenModal(row)
                        }}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  )
                }

                return (
                  <TableCell key={header?.field} align="left">
                    {row[header.field]}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tem certeza que deseja excluir esse registro?
          </Typography>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button variant="text" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              sx={{ color: "red" }}
              variant="text"
              onClick={() => {
                deleteProduct(productSelected)
                handleCloseModal()
              }}
            >
              Confirmar
            </Button>
          </div>
        </Box>
      </Modal>
    </TableContainer>
  )
}
