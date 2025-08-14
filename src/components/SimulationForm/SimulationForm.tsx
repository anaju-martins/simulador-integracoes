"use client";
import { Button, Stack, TextField, FormLabel, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  start: z.string().min(1, "Informe data e hora"),
  durationMinutes: z.number().min(1, "Não é permitido valores negativos").max(1440),
});
export type SimulationInput = z.infer<typeof schema>;

export default function SimulationForm({ onGenerate }:{ onGenerate:(data: SimulationInput)=>void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<SimulationInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      start: "",
      durationMinutes: 10,
    },
    
  });

  const errorTextSx = {
    mt: 0.4,
    fontSize: "0.75rem",
    color: "error.main",
  };

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
    paddingBottom: '7px'
  };

  return (
    <form onSubmit={handleSubmit(onGenerate)}>
      <Stack spacing={1} sx={{ width: 280, mx: "auto", bgcolor:"white", p:2, borderRadius:2, boxShadow:2 }}>
        <FormLabel sx={{ fontSize: "0.85rem", fontWeight: 600 }}>Data e Hora de Início</FormLabel>
        <TextField
          type="datetime-local"
          fullWidth
          size="small"
          {...register("start")}
          error={!!errors.start}
          sx={inputSx}
        />
        {errors.start && (
            <Box sx={errorTextSx}>{errors.start.message}</Box>
        )}

        <FormLabel sx={{ fontSize: "0.85rem", fontWeight: 600 }}>Duração (minutos)</FormLabel>
        <TextField
          type="number"
          fullWidth
          {...register("durationMinutes", { valueAsNumber: true })}
          placeholder="ex.: 60"
          error={!!errors.durationMinutes}
          helperText={errors.durationMinutes?.message}
          sx={inputSx}
        />

        <Button type="submit"
            variant="contained"
            sx={{
              bgcolor: "#05668D",
              color: "white",
              px: 4,
              borderRadius: 5,
              boxShadow: 2,
              textTransform: "none",
              fontWeight: 600,
              width: 250,
            }}>Gerar linha do tempo</Button>
      </Stack>
    </form>
  );
}
