"use client";
import MinuteSlot from "@/components/MinuteSlot/MinuteSlot";
import { Box } from "@mui/material";

export default function Timeline({
  data,
}: {
  data: Record<string, { items: import("@/types/integration").Integration[] }>;
}) {
  const minutes = Object.keys(data).sort();
   return (
  <Box sx={{ border: "1px solid #E0E0E0", borderRadius: 2, bgcolor: "#fff", overflow: "hidden", height: "100%" }}>
    <Box sx={{ height: "100%", overflowY: "auto" }}>
      {minutes.map((m) => (
        <MinuteSlot key={m} time={m} items={data[m].items} />
      ))}
    </Box>
  </Box>
);

}
