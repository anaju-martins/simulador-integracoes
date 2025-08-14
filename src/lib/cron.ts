import { addMinutes, isBefore } from "date-fns";

/** Executa a cada `everyMinutes` minutos, alinhado ao relógio (:00,:05,...) */
export function occurrencesBetweenEveryMinutes(
  everyMinutes: number,
  start: Date,
  end: Date
): Date[] {
  const out: Date[] = [];
  if (everyMinutes <= 0 || !Number.isFinite(everyMinutes)) return out;

  const aligned = new Date(start);
  aligned.setSeconds(0, 0);
  if (aligned < start) aligned.setMinutes(aligned.getMinutes() + 1);

  let cursor = aligned;
  while (!isBefore(end, cursor)) {
    if (cursor.getMinutes() % everyMinutes === 0) out.push(new Date(cursor));
    cursor = addMinutes(cursor, 1);
    if (out.length > 20000) break;
  }
  return out;
}
