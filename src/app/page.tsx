"use client";
import { useState } from "react";
import {
  Box, Button, Divider, Drawer, Stack, Typography,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
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
import { pickColorForIntegration } from "@/lib/colors";

export default function Page() {
  const { data: integrations } = useIntegrations();
  const createMut = useCreateIntegration();
  const updateMut = useUpdateIntegration();
  const deleteMut = useDeleteIntegration();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Integration | null>(null);
  const [simInput, setSimInput] = useState<SimulationInput | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const timeline = useTimeline(
    integrations,
    simInput?.start?.toString?.() ?? "",
    simInput?.durationMinutes ?? 0
  );

  function onNew() { setEditing(null); setOpen(true); }
  function onEdit(item: Integration) { setEditing(item); setOpen(true); }

  function onDelete(id?: number) {
    if (!id) return;
    setDeleteId(id);
  }

  function onSubmitIntegration(data: Integration) {
  if (editing?.id) {
    // ✅ caminho de UPDATE: garante id definido e preserva a cor existente
    const payload: Required<Integration> = {
      ...editing,          // preserva color e demais campos atuais
      ...data,             // aplica alterações do formulário
      id: editing.id,      // garante number
      color: editing.color ?? data.color, // (opcional) manter cor antiga
    };

    updateMut.mutate(payload); // agora bate com Required<Integration>
  } else {
    // ✅ caminho de CREATE: define a cor uma única vez
    const payload: Integration = {
      ...data,
      color: data.color ?? pickColorForIntegration(data),
    };
    createMut.mutate(payload);
  }

  setOpen(false);
}


  function handleConfirmDelete() {
    if (deleteId == null) return;
    deleteMut.mutate(deleteId, {
      onSettled: () => setDeleteId(null),
    });
  }
  function handleCancelDelete() {
    if (deleteMut.isPending) return; 
    setDeleteId(null);
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
        <Stack spacing={2} sx={{ height: "100%", justifyItems:"center", alignItems:"center", pt: 2 }}>
          <Button
            variant="contained"
            onClick={onNew}
            sx={{ bgcolor:"#4DAA2A", borderRadius: 10, width:"242px", height:"59px", fontSize: "20px", fontWeight: 600, justifyContent:"center" }}
          >
            + Adicionar
          </Button>

          <Box>
            <Typography variant="subtitle2" gutterBottom marginTop={3} sx={{color:"#787878", fontWeight: 600}}>
              CONTROLE DE SIMULAÇÃO
            </Typography>
            <SimulationForm onGenerate={setSimInput} />
          </Box>

          <Divider />

          <Box sx={{ overflow: "auto" }}>
            <Typography variant="subtitle2" gutterBottom sx={{color:"#787878", fontWeight: 600}}>
              INTEGRAÇÕES
            </Typography>
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

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
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

      {/* Modal de confirmação de exclusão */}
      <Dialog
        open={deleteId !== null}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirm-title"
      >
        <DialogTitle id="delete-confirm-title">Excluir tarefa?</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Esta ação não pode ser desfeita. Deseja realmente excluir a integração selecionada?
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={deleteMut.isPending} sx={{ color:"#787878"}}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={deleteMut.isPending}
          >
            {deleteMut.isPending ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
