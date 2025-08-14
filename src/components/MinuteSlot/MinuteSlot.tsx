"use client";
import { pickColorForIntegration } from "@/lib/colors";
import { Integration } from "@/types/integration";
import { Chip, Stack, Typography, Box } from "@mui/material";

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <Box
      sx={{
        px: 2.5,
        py: 1.25,
        bgcolor: color,
        color: "#fff",
        borderRadius: 2,
        fontWeight: 500,
        fontSize: 10,
        boxShadow: "0 3px 6px rgba(0,0,0,.18)",
        whiteSpace: "nowrap",
        letterSpacing: 0.2,
        userSelect: "none",
      }}
    >
      {label}
    </Box>
  );
}

export default function MinuteSlot({
  time,
  items,
}: {
  time: string;
  items: Integration[];
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ py: 1.25, borderBottom: (t) => `1px solid ${t.palette.divider}` }}
    >
      <Typography
        variant="body2"
        sx={{ pl: 2, width: 64, color: "text.secondary", fontVariantNumeric: "tabular-nums", fontWeight: 700 }}
      >
        {time}
      </Typography>

      <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" sx={{ flex: 1 }}>
        {items.map((it, i) => (
          <Pill key={`${time}-${it.id ?? it.name}-${i}`} label={it.name} color={pickColorForIntegration(it, i)} />
        ))}
      </Stack>
    </Stack>
  );
}