// app/dev/timeline/page.tsx
"use client";
import { useMemo } from "react";
import Timeline from "@/components/Timeline/Timeline";
import { Integration } from "@/types/integration";

function makeMock(min: string, name: string, doc: string, everyMinutes: number): Integration {
  return {
    id: Math.floor(Math.random() * 100000),
    name,
    documentType: doc,
    everyMinutes,
    stageStart: "Buscar",
    stageEnd: "Receber",
  };
}

export default function TimelinePlayground() {
  // mock simples: três minutos com listas diferentes
  const data = useMemo(() => {
    return {
      "08:30": { items: [makeMock("08:30", "Integração A", "TD_A", 5)] },
      "08:35": { items: [
        makeMock("08:35", "Integração B", "TD_B", 10),
        makeMock("08:35", "Integração C", "TD_C", 15),
      ]},
      "08:40": { items: [
        makeMock("08:40", "Integração D", "TD_D", 5),
      ]},
    } as Record<string, { items: Integration[] }>;
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <Timeline data={data} />
    </div>
  );
}
