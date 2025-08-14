"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Integration } from "@/types/integration";

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
    mutationFn: async (payload: Integration) => (await api.post("/integrations", payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
  });
}

export function useUpdateIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Required<Integration>) => (await api.put(`/integrations/${payload.id}`, payload)).data,
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