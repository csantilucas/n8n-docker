# Documentação do Projeto

## 1. Estados dos Menus de Autenticação

O sistema de autenticação opera em três estados principais, garantindo que o acesso às funcionalidades seja controlado e seguro.

### A. Estado: Deslogado (Guest)
Neste estado, o utilizador tem acesso limitado apenas às rotas públicas.
- **Login:** Campo de entrada para credenciais (E-mail/CPF e Senha).
- **Cadastro:** Fluxo para novos usuários.
- **Recuperação de Senha:** Link para envio de token de redefinição.

### B. Estado: Em Verificação (MFA/Token)
Estado intermediário durante o processamento do login ou validação de dois fatores (MFA).
- **Validação:** Verificação do JWT (JSON Web Token).
- **MFA:** Interface para inserção de código de segurança (se aplicável).

### C. Estado: Autenticado (User)
Uma vez validado, o menu de autenticação transforma-se num menu de perfil.
- **Perfil:** Visualização de dados do usuário e foto.
- **Configurações:** Gestão de conta e segurança.
- **Sair (Logout):** Encerramento de sessão e limpeza de tokens locais.

---

## 2. Fluxo dos Menus de Navegação

O fluxo de navegação é estruturado de forma hierárquica para facilitar a usabilidade entre os módulos do sistema.

### Estrutura de Navegação

1.  **Dashboard (Página Inicial)**
    - Visão geral de métricas e status em tempo real.
2.  **Módulos de Operação**
    - **Monitorização:** Acesso aos dados ativos (ex: sensores ou filas).
    - **Gestão:** Interface para criação e edição de registros.
3.  **Relatórios e Análise**
    - Histórico de dados com filtros por período.
    - Exportação de dados para formatos externos.
4.  **Configurações do Sistema**
    - Painel administrativo para controle de permissões e variáveis de ambiente.

### Regras de Fluxo
- **Acesso Direto:** Links rápidos para funcionalidades mais utilizadas no menu lateral.
- **Responsividade:** O menu adapta-se automaticamente para dispositivos móveis (Menu Hambúrguer).
- **Breadcrumbs:** Indicação do caminho percorrido para facilitar o retorno a seções anteriores.