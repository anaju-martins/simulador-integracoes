# 📌 Task Scheduler Simulator

Um simulador de execução de tarefas que permite **criar, editar, deletar e visualizar a linha do tempo** de processos recorrentes.  
O objetivo é ajudar a **identificar conflitos, gargalos e sobrecargas** quando múltiplas tarefas são executadas em paralelo.

---

## ✨ Funcionalidades

- ✅ **CRUD de tarefas**  
  Adicione, edite ou delete tarefas com informações como:  
  - Nome da tarefa  
  - Documento utilizado  
  - Frequência de execução (em minutos)  
  - Estágios do processo (exemplo: *Busca → Cadastro*)  

- ✅ **Simulação de linha do tempo**  
  - Defina a **data inicial** e o **tempo total da simulação (em minutos)**.  
  - Gere automaticamente slots de execução minuto a minuto.  
  - Visualize quais tarefas rodam em cada instante.  
  - Identifique **possíveis conflitos e gargalos**.

- ✅ **Cópia de CRON pronta**  
  - Cada tarefa possui um botão de **Copiar CRON**.  
  - Ajuste a frequência e copie a expressão cron para usar em ambientes reais.  

- ✅ **Atualização em tempo real**  
  - A linha do tempo é **re-renderizada automaticamente** quando edições ou exclusões são feitas.  

---

## 🖥️ Tecnologias utilizadas

- ⚛ **React** – base da aplicação.  
- 📝 **React Query** – gerenciamento de dados assíncronos.  
- 📡 **Axios** – consumo e envio de dados para a API fake.  
- 📂 **JSON Server** – backend fake para armazenamento de tarefas.  
- 🎨 **Material UI (MUI)** – componentes dinâmicos e estilizados.  
- 📝 **React Hook Form + Zod** – formulários com validação robusta.  
