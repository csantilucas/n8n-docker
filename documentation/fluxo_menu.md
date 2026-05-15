graph TD
    %% Início do Menu
    MP[Menu Principal] --> Op1[1. Minhas Faturas]
    MP --> Op2[2. Meus CCR]
    MP --> Op3[3. MTR]
    MP --> Op4[4. Meus Contratos]
    MP --> Op9[9. Atendimento Humano]
    
    %% Módulo Faturas
    Op1 --> API_Bol[API Boletos]
    API_Bol -- Lista faturas --> SelBol[Selecione Opção 1, 2, 3...]
    SelBol -- Escolha n --> PDF[Gera PDF da Fatura n]
    PDF --> Final((Fim do Fluxo))
    
    %% Módulo CCR
    Op2 --> SubCCR{Quantos CCRs?}
    SubCCR -- 1, 3 ou 6 --> API_CCR[API CCR]
    API_CCR --> ListCCR[Lista Links com Hiperlink]
    ListCCR --> Final
    
    %% Módulo Contratos
    Op4 --> API_Cont[API Contratos]
    API_Cont --> ListCont[Lista Contratos e Validade]
    ListCont --> Final
    
    %% Opções de Retorno
    Op9 --> Transf[Transferência para Consultor]
    PDF -.-> |0| MP
    ListCCR -.-> |0| MP
    ListCont -.-> |0| MP


    %%{init: {'theme': 'neutral', 'themeVariables': { 'primaryColor': '#ff9900', 'edgeLabelBackground':'#ffffff', 'tertiaryColor': '#fff'}}}%%
graph LR
    %% Título e Estilos Gerais
    classDef menu fill:#01579b,stroke:#01579b,stroke-width:1px,color:#fff,rx:10,ry:10;
    classDef module fill:#0277bd,stroke:#0277bd,stroke-width:1px,color:#fff,rx:10,ry:10;
    classDef sub fill:#039be5,stroke:#039be5,stroke-width:1px,color:#fff,rx:10,ry:10;
    classDef action fill:#4fc3f7,stroke:#4fc3f7,stroke-width:1px,color:#000,rx:10,ry:10;
    classDef back fill:#f5f5f5,stroke:#333,stroke-width:1px,color:#000,rx:10,ry:10;

    %% Início da Navegação
    Login((fa:fa-user Autenticado)) --> MP[<b>DASHBOARD</b><br/>Menu Principal]:::menu
    
    %% Módulo Monitorização
    MP --> MOD_MON[Monitorização]:::module
    MOD_MON --> SUB_STA[Detalhes da Estação]:::sub
    SUB_STA --> ACT_HIS[fa:fa-chart-area Ver Gráficos]:::action
    SUB_STA --> ACT_MAP[fa:fa-map-marked Ver no Mapa]:::action
    SUB_STA -.-> |fa:fa-arrow-left Sair| Login:::back
    
    %% Módulo Relatórios
    MP --> MOD_REP[Relatórios]:::module
    MOD_REP --> SUB_HIS[Histórico de Dados]:::sub
    SUB_HIS -- fa:fa-calendar-alt Período --> ACT_Filt[fa:fa-filter Filtrar]:::action
    ACT_Filt --> SUB_GEN[Gerar Relatório]:::sub
    SUB_GEN --> ACT_PDF[fa:fa-file-pdf Exportar PDF]:::action
    SUB_GEN --> ACT_CSV[fa:fa-file-csv Exportar CSV]:::action
    ACT_PDF -.-> |fa:fa-undo Voltar| MP:::back
    ACT_CSV -.-> |fa:fa-undo Voltar| MP:::back

    %% Módulo Gestão
    MP --> MOD_GES[Gestão fa:fa-users-cog]:::module
    MOD_GES --> SUB_USE[Gestão de Usuários]:::sub
    SUB_USE --> ACT_PER[fa:fa-key Permissões]:::action
    SUB_USE --> ACT_ADD[fa:fa-user-plus Novo Usuário]:::action
    MOD_GES --> SUB_DIS[Configuração Dispositivos]:::sub
    MOD_GES -.-> |fa:fa-arrow-left Voltar| MP:::back

    %% Módulo Configurações
    MP --> MOD_CFG[Configurações fa:fa-cogs]:::module
    MOD_CFG --> SUB_SEC[Segurança]:::sub
    SUB_SEC --> ACT_PWD[fa:fa-user-lock Alterar Senha]:::action
    SUB_SEC --> ACT_MFA[fa:fa-key Configurar MFA]:::action
    MOD_CFG -.-> |fa:fa-sign-out-alt Sair| Login:::back