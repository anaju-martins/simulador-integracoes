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

export function cronEveryMinutes(n: number): string {
  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    throw new TypeError("n deve ser um inteiro.");
  }
  if (n < 1) throw new RangeError("n deve ser >= 1.");
  if (n === 1) return "* * * * *";   // a cada minuto
  if (n === 60) return "0 * * * *";  // de hora em hora, no minuto 0
  if (n > 59) throw new RangeError("use 1..59 (ou 60)");
  return `*/${n} * * * *`;
}
