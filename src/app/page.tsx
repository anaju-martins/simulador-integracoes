"use client";
import { Container } from "@mui/material";
import { Integration } from "@/types/integration";
import IntegrationCard from "@/components/IntegrationCard/IntegrationCard";

export default function TestCardPage() {
  const mockData: Integration = {
    id: 1,
    name: "Teste_Importacao",
    documentType: "TD_Teste",
    cron: "*/5 * * * *",
    stageStart: "Início",
    stageEnd: "Fim"
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
