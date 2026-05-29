# 📂 Lista Geral de Estados e Fluxos (Status do Bot) — Atualizado

Este documento mapeia todos os estados, contextos e rotas internas que controlam a máquina de estados (FSM) do chatbot, armazenados no cache temporário do Redis e processados nos nós de fluxo.

---

## 1. Contexto de Autenticação (auth)

Estes valores ficam salvos na propriedade auth.estado_anterior dentro do JSON da sessão no Redis. Eles determinam se o cliente ultrapassou as travas de segurança ou se ainda está na fase de identificação.

- cliente_novo: O usuário acabou de entrar em contato e o bot precisa validar se ele possui um cadastro ativo. (Nó Origem: SET CLIENTE5) -> Dispara a pergunta: "Você já é nosso cliente?".
- autorizado: O cliente confirmou que possui cadastro. O sistema armazena o status para solicitar os dados de identificação. (Nó Origem: SET CLIENTE1) -> Solicitação de documentos (CPF/CNPJ).
- AGUARDANDO_CPF: O bot solicitou os dados e aguarda o envio do número puro do CPF ou CNPJ pelo usuário. (Nó Origem: SET CLIENTE4) -> Validação de string de documento.
- AGUARDANDO_CONFIRMAR: Cadastro localizado na API interna (Api_alpha localizar). O bot aguarda os 4 primeiros dígitos do CPF do responsável por segurança. (Nó Origem: SET AGUARDANDO_CONFIRMAR) -> Verificação de segurança de dígitos.
- autenticado_autorizado: Usuário validado com sucesso em todas as etapas e logado na sessão. (Nó Origem: DADOS_COMPLETOS) -> Liberação do acesso ao Menu Principal.
- TOKEN_EXPIRADO: O token de autenticação da API caiu por tempo limite (401 Unauthorized) interceptado pela Central de Erros. (Nó Origem: Nó de Código de Erros / Redis após HTTP Request de Aviso) -> Trava o fluxo e força o usuário a refazer o login inicial na próxima interação.

---

## 2. Contexto de Navegação de Menus (navegacao)

Estes valores ficam salvos na propriedade navegacao.menu_atual. Eles determinam em qual menu estático ou fluxo dinâmico de busca de dados o usuário se encontra no momento em que responde.

* inicio (ou vazio "")
    - O que significa: Estado padrão de fallback acionado quando o usuário não possui nenhum histórico ativo ou válido no cache do Redis.
    - Nota Técnica: Para evitar quebras de leitura, as expressions do n8n utilizam o operador de curto-circuito JSON.parse(... || "{}") garantindo a inicialização segura do objeto de sessão mesmo quando o retorno do Redis for nulo.

* Menu_Principal
    - O que significa: Menu raiz do chatbot. Exibe as opções estruturadas: 1-Faturas, 2-CCR, 3-MTR, 4-Contratos, 9-Atendente.
    - Gatilho/Nó: Definido no nó DADOS_COMPLETOS e mapeado na variável menuPrincipal do nó de código menu3.

* Meus_CCR (ou registrado como menu_ccr no mapa de rotas)
    - O que significa: Submenu específico de Comprovantes de Coleta (CCR). O bot aguarda o usuário escolher o período de busca desejado (Último, últimos 3 ou últimos 6).
    - Gatilho/Nó: Mapeado na variável menuCCR do nó menu3 e enviado diretamente para o nó estados_menus7.

* buscar_ccr
    - O que significa: Fluxo dinâmico disparado após a escolha do período de coletas. O bot lê a resposta, envia a requisição para a API_ALPHA(Ccr)1 e renderiza os links gerados.

* selecione_boleto
    - O que significa: Fluxo dinâmico de faturas. O cliente visualiza a lista de faturas abertas e o bot aguarda a digitação do índice da opção (ex: 1, 2, 3) para extrair e gerar o PDF.
    - Gatilho/Nó: Definido e tratado no nó estados_menus6.

* fluxo_finalizado
    - O que significa: Encerramento de uma consulta/operação realizada com sucesso. Exibe mensagem de agradecimento e questiona se o usuário deseja retornar ao início (1) ou transbordar para um atendente (2).
    - Gatilho/Nó: Definido no nó finalizado2.

---

## 3. Contexto de Rotas de Saída Internas (rota_destino / rota_erro)

Variáveis temporárias instanciadas durante a execução dos nós de processamento JavaScript (menu3 para navegação e Nó Code de Erro para exceções). Elas alimentam os componentes condicionais (Switches), que ramificam o fluxo para os respectivos nós de integração HTTP.

* abrir_menu -> Direciona o fluxo para o nó HTTP Request3 (recarrega layouts e estruturas visuais de menus).
* buscar_faturas -> Direciona para o nó HTTP Request26 (inicia a esteira de busca de faturas via API).
* selecione_boleto -> Direciona para o nó HTTP Request46 (chama a rota interna de geração/download do boleto físico).
* menu_ccr -> Direciona para o nó HTTP Request38 (envia o payload do menu visual de opções do CCR).
* buscar_ccr -> Direciona para o nó HTTP Request39 (consome a API interna de gerenciamento de coletas).
* menu_contrato -> Direciona para o nó HTTP Request42 (consome a API comercial/financeira de contratos).
* cliente_bloqueado -> Direciona para o nó HTTP Request44 (envia aviso de pendências administrativas/financeiras e bloqueia a árvore de navegação).
* ir_atendimento (ou atendimento com humano) -> Direciona para os nós HTTP Request37 / HTTP Request (compila o briefing da conversa e transfere o ticket para a fila humana do painel Z-Pro).
* fallback -> Direciona para o nó invalido2 (acionado quando a entrada do usuário não corresponde a nenhuma chave do dicionário do estado atual).
* token_expirado -> Rota de erro que direciona para a esteira de aviso de queda de sessão e atualiza a FSM do Redis para reiniciar o login.
* erro_geral -> Rota de erro padrão que direciona para avisos de instabilidades genéricas de infraestrutura ou timeouts da API da Alpha.
documentacao_estados_fsm.txt
Exibindo documentacao_estados_fsm.txt.