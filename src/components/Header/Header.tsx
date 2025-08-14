"use client";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Header(){
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{mb:2, mt: 2, mr:2}}>
      <Toolbar>
        <Typography variant="h5" fontWeight={800} fontSize={40} color="#14374E">Simulador de Execução de Integrações</Typography>
      </Toolbar>
    </AppBar>
  );
}