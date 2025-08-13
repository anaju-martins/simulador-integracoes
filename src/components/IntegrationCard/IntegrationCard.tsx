"use client";
import { Card, CardContent, CardActions, Typography, IconButton, Stack, Box } from "@mui/material";
import { Integration } from "@/types/integration";
import { PencilSimpleIcon, XIcon } from "@phosphor-icons/react";


export default function IntegrationCard({ item, onEdit, onDelete }:{ item: Integration; onEdit:()=>void; onDelete:()=>void }){
  return (
    <Card
    variant="outlined"
    sx={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      bgcolor: "#89C08E",
      width: 238,
      height: 90,
      boxShadow: 2,
      border: "none",
      borderRadius: 2,
    }}
  >
      {/* Ações no topo */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 0.5,
        }}
      >
        {/* Botão editar */}
        <Box
          onClick={onEdit}
          sx={{
            cursor: "pointer",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "background 0.2s ease, transform 0.15s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.2)"
            },
            
          }}
        >
          <PencilSimpleIcon size={18} color="white" weight="bold" />
        </Box>

        {/* Botão excluir */}
        <Box
          onClick={onDelete}
          sx={{
            cursor: "pointer",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "background 0.2s ease, transform 0.15s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.2)"
            },
          }}
        >
          <XIcon size={18} color="white" weight="bold" />
        </Box>
      </Box>

    <CardContent sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      pb: "4px", // padding inferior ajustado
    }}>
      <Typography fontSize="12px" fontWeight={600} color="white">
        {item.name}
      </Typography>
      <Typography variant="body2" fontSize="10px" color="white">
        TD: {item.documentType}
      </Typography>
      {/* Força o conteúdo para baixo */}
      <Typography variant="body2"
      fontSize="12px"
      fontWeight={600}
      color="white"
      sx={{ mt: "auto", paddingTop: "10px" }}>
        {item.stageStart} → {item.stageEnd}
      </Typography>
    </CardContent>
  </Card>
  );
}