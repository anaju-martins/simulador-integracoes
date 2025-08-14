"use client";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField, FormLabel, Box, } from "@mui/material";
import Grid from "@mui/material/Grid"; 
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Integration } from "@/types/integration";

const schema = z.object({
  name: z.string().min(3, "Campo Obrigatório"),
  documentType: z.string().min(2, "Campo Obrigatório"),
  cron: z.string().min(1, "Campo Obrigatório"),
  stageStart: z.string().min(1, "Campo Obrigatório"),
  stageEnd: z.string().min(1, "Campo Obrigatório"),
});

export default function IntegrationModal({
  open,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  initial?: Integration | null;
  onClose: () => void;
  onSubmit: (data: Integration) => void;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Integration>({
    resolver: zodResolver(schema),
    defaultValues:
      initial ?? {
        name: "",
        documentType: "",
        cron: "*/5 * * * *",
        stageStart: "",
        stageEnd: "",
      },
  });

  useEffect(() => {
    reset(
      initial ?? {
        name: "",
        documentType: "",
        cron: "",
        stageStart: "",
        stageEnd: "",
      }
    );
  }, [initial, reset]);

  
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#EEEEEE",
      borderRadius: "6px",
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
    },
    "& .MuiInputBase-input": {
      fontSize: '0.8rem',   
      lineHeight: 1.2,
      padding: '10px 12px',  
    },
    "& .MuiInputBase-input::placeholder": {
      fontSize: '0.85rem',
      opacity: 0.4,            
    },
  };

  // Estilo do texto de erro renderizado fora do TextField
  const errorTextSx = {
    mt: 0.75,
    fontSize: "0.75rem",
    color: "error.main",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: 384, 
          borderRadius: 2,
          py: 1,
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pb: 0 }}>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel sx={{ mb: 0.5, fontSize: "0.85rem", fontWeight: 600 }}>
                      Nome da Integração:
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors.name}
                      sx={inputSx}
                    />
                    {errors.name && (
                      <Box sx={errorTextSx}>{errors.name.message}</Box>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="documentType"
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel sx={{ mb: 0.5, fontSize: "0.85rem", fontWeight: 600 }}>
                      Tipo de Documento:
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors.documentType}
                      sx={inputSx}
                    />
                    {errors.documentType && (
                      <Box sx={errorTextSx}>{errors.documentType.message}</Box>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="cron"
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel sx={{ mb: 0.5, fontSize: "0.85rem", fontWeight: 600 }}>
                      CRON:
                    </FormLabel>
                    <TextField
                      {...field}
                      placeholder="ex.: */5 * * * *"
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors.cron}
                      sx={inputSx}
                    />
                    {errors.cron && (
                      <Box sx={errorTextSx}>{errors.cron.message}</Box>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="stageStart"
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel sx={{ mb: 0.5, fontSize: "0.85rem", fontWeight: 600 }}>
                      Estágio Inicial:
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors.stageStart}
                      sx={inputSx}
                    />
                    {errors.stageStart && (
                      <Box sx={errorTextSx}>{errors.stageStart.message}</Box>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="stageEnd"
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel sx={{ mb: 0.5, fontSize: "0.85rem", fontWeight: 600 }}>
                      Estágio Final:
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors.stageEnd}
                      sx={inputSx}
                    />
                    {errors.stageEnd && (
                      <Box sx={errorTextSx}>{errors.stageEnd.message}</Box>
                    )}
                  </>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2, pt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#4DAA2A",
              color: "white",
              px: 4,
              borderRadius: 5,
              boxShadow: 2,
              textTransform: "none",
              fontWeight: 600,
              width: 250,
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
