# 🚀 Projeto Preserva Solutions - Alpha Software

> Sistema de automação de atendimento via WhatsApp integrado ao ERP Alpha.

---

## 🏗️ Stack Tecnológica

| Tecnologia | Função | Versão |
| :--- | :--- | :--- |
| ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) | Virtualização | 24.x+ |
| ![n8n](https://img.shields.io/badge/n8n-FF6C37?style=for-the-badge&logo=n8n&logoColor=white) | Orquestração | 1.x |
| ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) | Cache/Sessão | 7.x |
| ![Evolution](https://img.shields.io/badge/Evolution_API-0056D2?style=for-the-badge) | WhatsApp | 2.x |

---


🛠️ Detalhes Técnicos
1. Gestão de Contexto (Redis)
Utilizamos o Redis para salvar o estado da conversa e os dados do cliente temporariamente. Isso permite que o usuário selecione a "Opção 1" em um menu e o bot saiba exatamente a qual fatura ele se refere.

Key: status:{{remoteJid}}

Expire: 30 minutos.

2. Tratamento de Dados (Node Code)
Lógica em JavaScript para normalizar as respostas das APIs legadas:

JavaScript
// Limpeza de espaços para pagamento facilitado
const linhaLimpa = item.linha_dgt.replace(/\s+/g, '');
3. Comunicação (Evolution API)
Integração via Webhooks para recebimento e REST para envio de mensagens de texto e mídia (PDF).

🚀 Como Executar o Projeto
Certifique-se de ter o Docker e Docker Compose instalados.

Clone este repositório e configure o arquivo .env.

Suba o ambiente:

Bash
docker-compose up -d
Importe o workflow do n8n localizado na pasta /workflows.

````
 📂Files
 ┣ 📂documentation
 ┃ ┣ 📜fluxo_login.mmd
 ┃ ┣ 📜fluxo_menu.mmd
 ┃ ┗ 📜plano_geral.md
 ┣ 📂workflows
 ┃ ┣ 📜chatbot.json
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜chatbot.json
 ┣ 📜docker-compose.yml
 ┗ 📜README.md
````





