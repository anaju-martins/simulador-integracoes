"use client";
import { Container } from "@mui/material";
import { Integration } from "@/types/integration";
import IntegrationCard from "@/components/IntegrationCard/IntegrationCard";

export default function TestCardPage() {
  const mockData: Integration = {
    id: 1,
    name: "A52_Buscar_Viagens",
    documentType: "A52_Viagens",
    cron: "*/5 * * * *",
    stageStart: "1",
    stageEnd: "3",
  };

  return (
    <Container sx={{ py: 4 }}>
      <IntegrationCard
        item={mockData}
        onEdit={() => alert("Editar")}
        onDelete={() => alert("Excluir")}
      />
    </Container>
  );
}
