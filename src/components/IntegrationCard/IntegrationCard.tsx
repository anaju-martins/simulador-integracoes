"use client";
import { Card, CardContent, CardActions, Typography, IconButton, Stack } from "@mui/material";
import { Integration } from "@/types/integration";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function IntegrationCard({ item, onEdit, onDelete }:{ item: Integration; onEdit:()=>void; onDelete:()=>void }){
  return (
    <Card variant="outlined" sx={{bgcolor:"background.paper"}}>
      <CardContent>
        <Typography fontWeight={700}>{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">{item.documentType} · {item.cron}</Typography>
      </CardContent>
      <CardActions sx={{pt:0, justifyContent:"flex-end"}}>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={onEdit}><EditIcon/></IconButton>
          <IconButton size="small" color="error" onClick={onDelete}><DeleteIcon/></IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}