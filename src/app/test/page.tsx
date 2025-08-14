"use client";
import SimulationForm, { SimulationInput } from "@/components/SimulationForm/SimulationForm";
import { Container, Typography } from "@mui/material";

export default function TestSimulationFormPage() {
  function handleGenerate(data: SimulationInput) {
    console.log("Dados enviados:", data);
    alert(`Início: ${data.start}\nDuração: ${data.durationMinutes} minutos`);
  }

  return (
    <Container sx={{ py: 4 }}>
      
      <SimulationForm onGenerate={handleGenerate} />
    </Container>
  );
}
