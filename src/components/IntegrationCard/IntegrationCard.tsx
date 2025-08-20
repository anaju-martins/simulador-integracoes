"use client";
import { Card, CardContent, CardActions, Typography, Box, Snackbar } from "@mui/material";
import { Integration } from "@/types/integration";
import { ClipboardTextIcon, PencilSimpleIcon, XIcon } from "@phosphor-icons/react";
import { pickColorForIntegration } from "@/lib/colors";
import { cronEveryMinutes } from "@/lib/cron";       
import { copyToClipboard } from "@/lib/clipboard";
import { useState } from "react";


export default function IntegrationCard({ item, onEdit, onDelete, color, }: { item: Integration; onEdit: () => void; onDelete: () => void; index?: number; color?: string; }) {

  const [snackOpen, setSnackOpen] = useState(false);
  const [bgColor] = useState(() => color ?? item.color ?? pickColorForIntegration(item));


  async function handleCopyCron() {
    try {
      const expr = cronEveryMinutes(item.everyMinutes);
      const ok = await copyToClipboard(expr);
      setSnackOpen(ok);
    } catch {
      // opcional: exibir outro snackbar de erro
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        bgcolor: bgColor,
        width: 280,
        height: 110,
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
        <Typography fontSize="12px" fontWeight={600} color="white" sx={{
          maxWidth: 180,          
          whiteSpace: 'normal',   
          overflowWrap: 'anywhere', 
          wordBreak: 'break-word',  
          minWidth: 0,
        }}>
          {item.name}
        </Typography>
        <Typography variant="body2" fontSize="10px" color="white">
          {item.documentType}
        </Typography>
        <Typography variant="body2" fontSize="10px" color="white">
          A cada {item.everyMinutes} minutos
        </Typography>
        {/* Força o conteúdo para baixo */}
        <Typography variant="body2"
          fontSize="12px"
          fontWeight={600}
          color="white"
        >
          {item.stageStart} → {item.stageEnd}
        </Typography>
      </CardContent>

      <Box
        onClick={handleCopyCron}
        title="Copiar CRON"
        aria-label="Copiar CRON"
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          cursor: "pointer",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          transition: "background 0.2s ease, transform 0.15s ease",
          backgroundColor: "rgba(255, 255, 255, 0.18)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.28)",
            transform: "scale(1.1)",
          },
          "&:active": { transform: "scale(0.92)" },
        }}
      >
        <ClipboardTextIcon size={18} color="white" weight="bold" />
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={1500}
        onClose={() => setSnackOpen(false)}
        message="CRON copiada para a área de transferência"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
}