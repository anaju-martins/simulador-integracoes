// hooks/useTimeline.ts
"use client";
import { useMemo } from "react";
import { format, addMinutes, isBefore } from "date-fns";
import { Integration } from "@/types/integration";
import { occurrencesBetweenEveryMinutes } from "@/lib/cron";

export function useTimeline(
  integrations: Integration[] | undefined,
  startStr: string,
  durationMinutes: number
): Record<string, { items: Integration[] }> {
  return useMemo(() => {
    if (!integrations || !startStr || !durationMinutes) return {};

    const start = new Date(startStr);
    if (Number.isNaN(start.getTime())) return {};

    const end = addMinutes(start, durationMinutes);
    const out: Record<string, { items: Integration[] }> = {};

    for (const integ of integrations) {
      const every = typeof integ.everyMinutes === "number" && integ.everyMinutes > 0
        ? integ.everyMinutes
        : 60;

      const times = occurrencesBetweenEveryMinutes(every, start, end);
      for (const t of times) {
        const key = format(t, "HH:mm");
        if (!out[key]) out[key] = { items: [] };
        out[key].items.push(integ);
      }
    }
    return out;
  }, [integrations, startStr, durationMinutes]);
}
