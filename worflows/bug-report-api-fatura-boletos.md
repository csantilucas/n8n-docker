# Bug Report — Endpoint `/api/chatbot/fatura`

**Para:** Time de desenvolvimento da API Alpha  
**De:** Integração Chatbot WhatsApp (n8n)  
**Data:** 08/06/2026  
**Prioridade:** Alta — impacta envio de PDF de boleto ao cliente

---

## Contexto

| Item | Valor |
|------|-------|
| Endpoint | `GET /api/chatbot/fatura?limite=3` |
| Cliente de teste | `id_cliente = 5997` |
| Uso no chatbot | Listar as 3 faturas mais próximas do vencimento; cliente escolhe e recebe PDF via `/api/chatbot/arquivo?id_boleto={id}` |

---

## O que a API retorna hoje

```json
"dados": [
  { "idBoleto": 157582, "numeroDocumento": "5471-12", "vencimento": "2026-06-15", "valor": 200, "status": "Aberto" },
  { "idBoleto": 183484, "numeroDocumento": "8115-1",  "vencimento": "2026-07-15", "valor": 215, "status": "Aberto" },
  { "idBoleto": 183485, "numeroDocumento": "8115-2",  "vencimento": "2026-08-15", "valor": 215, "status": "Aberto" }
]
```

**Observações:**

- Retorno limitado a 3 registros (ok pelo parâmetro `limite=3`)
- Nenhum dos 3 possui `LINK_EXTERNO_BOL` preenchido no banco
- O JSON **não traz** campo de link/URL do PDF

---

## O que existe no banco (mesmo cliente)

**Total:** 33 boletos para `id_cliente = 5997`

| Situação | Quantidade |
|----------|------------|
| Com `LINK_EXTERNO_BOL` preenchido (PDF no Dropbox) | **11** |
| Sem link (campo vazio) | **22** |
| Retornados pela API | **3** (todos sem link) |

**Nenhum dos 11 boletos com link foi retornado**, incluindo os da série `9041-*`, que são justamente os que têm PDF disponível.

---

## Prova do filtro incorreto (mesma data de vencimento)

| Vencimento | Banco — com link (não retornado) | API — sem link (retornado) |
|------------|----------------------------------|----------------------------|
| 2026-07-15 | `183472` — 9041-1 — R$ 215,00 | `183484` — 8115-1 — R$ 215,00 |
| 2026-08-15 | `183473` — 9041-2 — R$ 215,00 | `183485` — 8115-2 — R$ 215,00 |

Para a **mesma data de vencimento**, a API escolhe o boleto **sem link** e descarta o que **tem PDF**.

**Hipótese:** a query está excluindo registros com `LINK_EXTERNO_BOL` preenchido (ex.: `WHERE LINK_EXTERNO_BOL IS NULL` ou equivalente), quando o esperado seria incluí-los — ou até priorizá-los.

---

## Exemplos de boletos com link ausentes na API

| ID_BOLETO | NUMERO | dt_vencimento | LINK_EXTERNO_BOL |
|-----------|--------|---------------|------------------|
| 183472 | 9041-1 | 2026-07-15 | `https://dl.dropbox.com/scl/fi/ph5jogkt4a23bjujsx7hj/...` |
| 183473 | 9041-2 | 2026-08-15 | `https://dl.dropbox.com/scl/fi/e4mvuqvd30bhqba4upic4/...` |
| 183481 | 9041-10 | 2027-04-15 | `https://dl.dropbox.com/scl/fi/vyvpvo470qc822snjhd2i/...` |
| 183482 | 9041-11 | 2027-05-15 | `https://dl.dropbox.com/scl/fi/g2ul4sq475lld1nl11fy9/...` |

*+ 7 registros da série 9041 com link, todos fora do retorno.*

### Lista completa — boletos com link no banco (nenhum retornado)

| ID_BOLETO | NUMERO | dt_vencimento | VALOR |
|-----------|--------|---------------|-------|
| 183472 | 9041-1 | 2026-07-15 | 215,00 |
| 183473 | 9041-2 | 2026-08-15 | 215,00 |
| 183474 | 9041-3 | 2026-09-15 | 215,00 |
| 183475 | 9041-4 | 2026-10-15 | 215,00 |
| 183476 | 9041-5 | 2026-11-15 | 215,00 |
| 183477 | 9041-6 | 2026-12-15 | 215,00 |
| 183478 | 9041-7 | 2027-01-15 | 215,00 |
| 183479 | 9041-8 | 2027-02-15 | 215,00 |
| 183480 | 9041-9 | 2027-03-15 | 215,00 |
| 183481 | 9041-10 | 2027-04-15 | 215,00 |
| 183482 | 9041-11 | 2027-05-15 | 215,00 |

---

## Impacto no chatbot

1. Cliente vê faturas (`8115-1`, `8115-2`) **sem PDF** no banco
2. Ao selecionar, a chamada `/api/chatbot/arquivo?id_boleto=183484` tende a falhar ou não gerar arquivo
3. Boletos **com PDF pronto** (`9041-1`, `9041-2`, etc.) **nunca aparecem** no menu

---

## Comportamento esperado

Para `GET /api/chatbot/fatura?limite=3` com `id_cliente = 5997`:

```json
"dados": [
  { "idBoleto": 157582, "numeroDocumento": "5471-12", "vencimento": "2026-06-15", "valor": 200, "linkExterno": null },
  { "idBoleto": 183472, "numeroDocumento": "9041-1",  "vencimento": "2026-07-15", "valor": 215, "linkExterno": "https://dl.dropbox.com/..." },
  { "idBoleto": 183473, "numeroDocumento": "9041-2",  "vencimento": "2026-08-15", "valor": 215, "linkExterno": "https://dl.dropbox.com/..." }
]
```

**Regras esperadas:**

1. Ordenar por `dt_vencimento` ascendente (vencimento mais próximo primeiro)
2. **Não excluir** boletos com `LINK_EXTERNO_BOL` preenchido
3. Retornar o link no JSON (mapear `LINK_EXTERNO_BOL` → `linkExterno` ou nome acordado)

---

## Como reproduzir

1. Autenticar como cliente `5997`
2. Chamar `GET /api/chatbot/fatura?limite=3`
3. Comparar `idBoleto` retornados com a tabela do banco
4. Verificar que os IDs `183472`, `183473` (com link) **não aparecem**, e `183484`, `183485` (sem link) **aparecem no lugar**

---

## Solicitação

Verificar a query/SQL do endpoint e confirmar se a exclusão de boletos com link é intencional. Se não for, precisamos da correção para o fluxo de envio de PDF no WhatsApp funcionar corretamente.
