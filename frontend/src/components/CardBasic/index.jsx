import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

export function CardBasic({
  title,
  subtitle,
  description,
  buttonAction,
  titleButton,
}) {
  return (
    <Card sx={{ minWidth: 275, height: "100%", boxShadow: "none" }}>
      <CardContent>
        {title && (
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {subtitle}
          </Typography>
        )}

        {description && (
          <Typography variant="body2" style={{ maxWidth: "575px" }}>
            {description}
          </Typography>
        )}
      </CardContent>

      {titleButton && (
        <CardActions>
          <Button size="small" onClick={buttonAction}>
            {titleButton}
          </Button>
        </CardActions>
      )}
    </Card>
  )
}
