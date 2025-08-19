"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Integration } from "@/types/integration";
import { pickColorForIntegration } from "@/lib/colors";

const api = axios.create({ baseURL: "http://localhost:3001" });

export function useIntegrations() {
  return useQuery({
    queryKey: ["integrations"],
    queryFn: async () => (await api.get<Integration[]>("/integrations")).data,
  });
}

export function useCreateIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Integration) => {
      // Se não veio cor do form, gera e persiste:
      const withColor: Integration = {
        ...payload,
        color: payload.color ?? pickColorForIntegration(payload),
      };
      return (await api.post("/integrations", withColor)).data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  });
}

export function useUpdateIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Required<Integration>) => {
      // Não regenere cor ao editar (preserva a existente)
      // Se por algum motivo vier sem cor, repara usando o helper
      const withColor: Required<Integration> = {
        ...payload,
        color: payload.color ?? pickColorForIntegration(payload),
      };
      return (await api.put(`/integrations/${withColor.id}`, withColor)).data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  });
}

export function useDeleteIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => (await api.delete(`/integrations/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  });
}