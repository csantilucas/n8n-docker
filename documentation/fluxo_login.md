graph TD
    %% Início
    Start((Início)) --> Guest{Estado: Guest}
    
    %% Fluxo de Login
    Guest -- Informa CPF/CNPJ --> API_Auth[API Busca Cliente]
    API_Auth -- Não encontrado --> LoginFail[Mensagem de Erro]
    LoginFail --> Guest
    
    API_Auth -- Encontrado --> Verif{Estado: Verificação}
    
    %% Fluxo de Verificação
    Verif -- Digita 4 dígitos --> IfValid{Dados Corretos?}
    IfValid -- Não --> Verif
    IfValid -- Sim --> CheckStatus{Inativo ou Bloqueado?}
    
    %% Trava de Segurança
    CheckStatus -- Sim --> Block[Menu Bloqueado / Transf. Humana]
    CheckStatus -- Não --> AuthSuccess[Estado: Autenticado]
    
    %% Finalização
    AuthSuccess --> MenuPrincipal[Carrega Menu Principal]

    %%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0056D2', 'edgeLabelBackground':'#ffffff', 'tertiaryColor': '#fff'}}}%%
graph TD
    %% Título e Estilos Gerais
    classDef state fill:#f9f9f9,stroke:#333,stroke-width:1px,rx:10,ry:10;
    classDef process fill:#e1f5fe,stroke:#0277bd,stroke-width:1px,color:#01579b,rx:10,ry:10;
    classDef input fill:#fff3e0,stroke:#ef6c00,stroke-width:1px,color:#e65100,rx:10,ry:10;
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:1px,color:#b71c1c,rx:10,ry:10;
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:1px,color:#1b5e20,rx:10,ry:10;

    %% Início do Fluxo
    Start((fa:fa-play Início)) --> E_GUE[<b>👤 GUEST</b><br/>Estado: Deslogado]:::state
    
    %% Cadastro de Novos Usuários
    E_GUE -- fa:fa-user-plus Novo --> I_CAD[Cadastro: E-mail, CPF, Nome]:::input
    I_CAD --> P_VET[Validação e Envio de Token]:::process
    P_VET --> E_GUE
    
    %% Fluxo de Login
    E_GUE -- fa:fa-sign-in Iniciar --> I_LOG[<b>Login:</b> Informa E-mail e Senha]:::input
    I_LOG --> P_VAL_TKN{<b>Token de Acesso?</b>}:::process
    
    %% Recuperação de Senha
    P_VAL_TKN -- fa:fa-unlock Esqueceu --> I_REC[Informar E-mail/CPF]:::input
    I_REC --> P_ENV_REC[Enviar Link de Redefinição]:::process
    P_ENV_REC --> E_GUE
    
    %% MFA e Validação de Token
    P_VAL_TKN -- fa:fa-key Sim/JWT --> P_VER_TKN[Verificação do JWT]:::process
    P_VER_TKN -- fa:fa-times Inválido --> E_GUE
    
    %% Estado em Verificação
    P_VER_TKN -- fa:fa-shield-alt Válido --> E_VER[<b>⌛ VERIFICAÇÃO</b><br/>Aguardando MFA]:::state
    E_VER -- fa:fa-mobile Informar Código --> I_MFA[Código MFA]:::input
    I_MFA --> P_VAL_MFA{<b>Código MFA Válido?</b>}:::process
    
    %% Falha de MFA
    P_VAL_MFA -- fa:fa-times Não --> E_ERR_MFA[<b>⚠️ ERRO MFA</b><br/>Acesso Negado]:::error
    E_ERR_MFA --> E_VER
    
    %% Sucesso e Estado Autenticado
    P_VAL_MFA -- fa:fa-check Sim --> E_AUT[<b>✅ AUTENTICADO</b><br/>Token Gerado]:::success
    E_AUT --> P_GEN_STT[Carregar Status e Sessão]:::process
    P_GEN_STT --> End((fa:fa-stop Fim)):::state