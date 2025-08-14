// lib/groupByMinute.ts
import { format } from "date-fns";
import { Integration } from "@/types/integration";
import { occurrencesBetweenEveryMinutes } from "@/lib/cron";

export type MinuteKey = string; // "HH:mm"
export interface MinuteBucket {
  key: MinuteKey;
  executions: { time: Date; integration: Integration }[];
}

export function groupExecutionsByMinute(
  integrations: Integration[],
  start: Date,
  end: Date
) {
  const map: Record<MinuteKey, MinuteBucket> = {};

  for (const integ of integrations) {
    // Garantia: se não vier valor, assume 60 min
    const every = typeof integ.everyMinutes === "number" && integ.everyMinutes > 0
      ? integ.everyMinutes
      : 60;

    const times = occurrencesBetweenEveryMinutes(every, start, end);

    for (const time of times) {
      const key = format(time, "HH:mm");
      if (!map[key]) map[key] = { key, executions: [] };
      map[key].executions.push({ time, integration: integ });
    }
  }
  return map;
}
