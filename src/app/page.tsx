"use client";
import { useState } from "react";
import {
  Box, Button, Divider, Drawer, Stack, Typography
} from "@mui/material";
import { Integration } from "@/types/integration";
import {
  useCreateIntegration, useDeleteIntegration, useIntegrations, useUpdateIntegration
} from "@/hooks/useIntegrations";
import { useTimeline } from "@/hooks/useTimeline";
import SimulationForm, { SimulationInput } from "@/components/SimulationForm/SimulationForm";
import IntegrationCard from "@/components/IntegrationCard/IntegrationCard";
import Timeline from "@/components/Timeline/Timeline";
import IntegrationModal from "@/components/IntegrationModal/IntegrationModal";
import Header from "@/components/Header/Header";

export default function Page() {
  const { data: integrations } = useIntegrations();
  const createMut = useCreateIntegration();
  const updateMut = useUpdateIntegration();
  const deleteMut = useDeleteIntegration();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Integration | null>(null);
  const [simInput, setSimInput] = useState<SimulationInput | null>(null);
  const timeline = useTimeline(
    integrations,
    simInput?.start?.toString?.() ?? "",
    simInput?.durationMinutes ?? 0
  );

  function onNew() { setEditing(null); setOpen(true); }
  function onEdit(item: Integration) { setEditing(item); setOpen(true); }
  function onDelete(id?: number) { if (!id) return; if (confirm("Excluir integração?")) deleteMut.mutate(id); }
  function onSubmitIntegration(data: Integration) {
  const payload = {
    ...data,
    id: editing?.id ?? data.id,         
  };

  if (editing?.id) updateMut.mutate(payload as Required<Integration>);
  else createMut.mutate(payload);

  setOpen(false);
}

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar fixa */}
      <Drawer
        variant="permanent"
        open
        sx={{
          flexShrink: 0,
          width: 320,
          [`& .MuiDrawer-paper`]: {
            position: "relative",
            width: 320,
            boxSizing: "border-box",
            p: 2,
            height: "100vh", 
            bgcolor: "#F5F5F5",
          },
        }}
      >
        <Stack spacing={2} sx={{ height: "100%", justifyItems:"center", alignItems:"center" }}>
          <Box
            sx={{
              width: 200,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight={800} fontSize={30} color="#14374E">Logo </Typography>
            {/* <img
              src="/images/logoBalm.png" 
              alt="Logo"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            /> */}
          </Box>
          
          <Button variant="contained" onClick={onNew} sx={{ bgcolor:"#4DAA2A", borderRadius: 10, width:"242px", height:"59px", fontSize: "20px", fontWeight: 600, justifyContent:"center", }}>+ Adicionar</Button>

          <Box>
            <Typography variant="subtitle2" gutterBottom marginTop={3} sx={{color:"#787878", fontWeight: 600}}>CONTROLE DE SIMULAÇÃO</Typography>
            <SimulationForm onGenerate={setSimInput} />
          </Box>

          <Divider />

          <Box sx={{ overflow: "auto" }}>
            <Typography variant="subtitle2" gutterBottom sx={{color:"#787878", fontWeight: 600}}>INTEGRAÇÕES</Typography>
            <Stack spacing={1}>
              {integrations?.map((it) => (
                <IntegrationCard
                  key={it.id}
                  item={it}
                  onEdit={() => onEdit(it)}
                  onDelete={() => onDelete(it.id)}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Drawer>

      {/* MAIN: preenche o resto da tela */}
      <Box
        component="main"
        sx={{
          flex: 1,               // ocupa o espaço restante
          minWidth: 0,           // evita overflow horizontal
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",    // Header fixo + conteúdo rolável
        }}
      >
        <Header />

        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          {!simInput ? (
            <Typography variant="body2" color="text.secondary">
              Defina o início e a duração e clique em "Gerar linha do tempo".
            </Typography>
          ) : (
            <Timeline data={timeline} />
          )}
        </Box>
      </Box>

      <IntegrationModal
        open={open}
        initial={editing}
        onClose={() => setOpen(false)}
        onSubmit={onSubmitIntegration}
      />
    </Box>
  );
}