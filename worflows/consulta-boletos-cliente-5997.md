# Consulta de boletos — Cliente 5997

Consulta executada no banco para validar os dados retornados pelo endpoint `/api/chatbot/fatura`.

---

## SQL utilizada

```sql
SELECT
    p.id_cliente,
    b.ID_BOLETO_GERADO,
    b.dt_vencimento,
    b.DT_EMISSAO,
    b.VALOR_BOLETO,
    b.NUMERO,
    b.LINK_EXTERNO_BOL
FROM boleto_gerado b
INNER JOIN pessoa p ON b.id_cliente = p.id_cliente
WHERE b.DT_VENCIMENTO > '2026-05-01 00:00:00.000'
  AND p.INATIVO = 'Nao'
  AND p.BLOQUEA = 'Nao'
  AND p.ID_CLIENTE = '5997'
ORDER BY b.dt_vencimento DESC;
```

**Filtros aplicados:**

- Vencimento após `2026-05-01`
- Cliente ativo (`INATIVO = 'Nao'`)
- Cliente não bloqueado (`BLOQUEA = 'Nao'`)
- `id_cliente = 5997`
- Ordenação: `dt_vencimento DESC`

**Total de registros:** 30

---

## Resultado completo

| id_cliente | ID_BOLETO_GERADO | dt_vencimento | DT_EMISSAO | VALOR_BOLETO | NUMERO | LINK_EXTERNO_BOL |
|------------|------------------|---------------|------------|--------------|--------|------------------|
| 5997 | 183483 | 2027-06-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-12 | — |
| 5997 | 183495 | 2027-06-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-12 | — |
| 5997 | 183494 | 2027-05-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-11 | — |
| 5997 | 183482 | 2027-05-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-11 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/g2ul4sq475lld1nl11fy9/Boleto_6742809_15052027_152058.pdf?rlkey=uufl92iebfd519eqdk5tjc2le&dl=0) |
| 5997 | 183493 | 2027-04-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-10 | — |
| 5997 | 183481 | 2027-04-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-10 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/vyvpvo470qc822snjhd2i/Boleto_6742790_15042027_152055.pdf?rlkey=45z5bi7c4hz4lnpmav4ks1zxc&dl=0) |
| 5997 | 183480 | 2027-03-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-9 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/ml7hxubzl02vx2d4r3ihk/Boleto_6742783_15032027_152052.pdf?rlkey=ybm19t9tuezjkzcf0pqfxrpl7&dl=0) |
| 5997 | 183492 | 2027-03-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-9 | — |
| 5997 | 183491 | 2027-02-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-8 | — |
| 5997 | 183479 | 2027-02-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-8 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/yrlu4gcbgebrm6ywshnhq/Boleto_6742776_15022027_152049.pdf?rlkey=gf8w1pf5wj5v7twmusu46mth4&dl=0) |
| 5997 | 183478 | 2027-01-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-7 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/jw2mepsw53j0dd9xn25cf/Boleto_6742769_15012027_152046.pdf?rlkey=g3h45kwas9jal5u5fomiaoz66&dl=0) |
| 5997 | 183490 | 2027-01-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-7 | — |
| 5997 | 183489 | 2026-12-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-6 | — |
| 5997 | 183477 | 2026-12-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-6 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/ox8pxwwqwq01kynuqmrgc/Boleto_6742751_15122026_152043.pdf?rlkey=xtzk72dvz3z36xepur405ut7c&dl=0) |
| 5997 | 183476 | 2026-11-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-5 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/3856n4a0fcc1qglskywk6/Boleto_6742744_15112026_152040.pdf?rlkey=ac6lexeyuhpyqkfdw0mqq70n9&dl=0) |
| 5997 | 183488 | 2026-11-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-5 | — |
| 5997 | 183487 | 2026-10-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-4 | — |
| 5997 | 183475 | 2026-10-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-4 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/89n3fvlvegk0novgexmqm/Boleto_6742737_15102026_152037.pdf?rlkey=6qifin5ta43gel59gulow9kxx&dl=0) |
| 5997 | 183474 | 2026-09-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-3 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/3r21envif3m0z9p4bqnr7/Boleto_6742720_15092026_152034.pdf?rlkey=bb8t04ep88dqm1kgkfyiykh8w&dl=0) |
| 5997 | 183486 | 2026-09-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-3 | — |
| 5997 | 183485 | 2026-08-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-2 | — |
| 5997 | 183473 | 2026-08-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-2 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/e4mvuqvd30bhqba4upic4/Boleto_6742712_15082026_152031.pdf?rlkey=lj0guvgel53jxkydiwckmmghp&dl=0) |
| 5997 | 183472 | 2026-07-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 9041-1 | [PDF Dropbox](https://dl.dropbox.com/scl/fi/ph5jogkt4a23bjujsx7hj/Boleto_6742705_15072026_152026.pdf?rlkey=1q4didt6ry1d9c7quxicbpnor&dl=0) |
| 5997 | 183484 | 2026-07-15 00:00:00.000 | 2026-05-21 00:00:00.000 | 215,00 | 8115-1 | — |
| 5997 | 157582 | 2026-06-15 00:00:00.000 | 2025-06-26 00:00:00.000 | 200,00 | 5471-12 | — |
| 5997 | 157581 | 2026-05-15 00:00:00.000 | 2025-06-26 00:00:00.000 | 200,00 | 5471-11 | — |
| 5997 | 157580 | 2026-04-15 00:00:00.000 | 2025-06-26 00:00:00.000 | 200,00 | 5471-10 | — |
| 5997 | 157579 | 2026-03-15 00:00:00.000 | 2025-06-26 00:00:00.000 | 200,00 | 5471-9 | — |
| 5997 | 157578 | 2026-02-15 00:00:00.000 | 2025-06-26 00:00:00.000 | 200,00 | 5471-8 | — |
| 5997 | 157577 | 2026-01-15 00:00:00.000 | 2025-06-26 00:00:00.000 | 200,00 | 5471-7 | — |

---

## Resumo

| Métrica | Valor |
|---------|-------|
| Total de boletos | 30 |
| Com `LINK_EXTERNO_BOL` (PDF disponível) | **11** |
| Sem link | **19** |

### Boletos com PDF (série 9041)

| ID_BOLETO_GERADO | NUMERO | dt_vencimento |
|------------------|--------|---------------|
| 183482 | 9041-11 | 2027-05-15 |
| 183481 | 9041-10 | 2027-04-15 |
| 183480 | 9041-9 | 2027-03-15 |
| 183479 | 9041-8 | 2027-02-15 |
| 183478 | 9041-7 | 2027-01-15 |
| 183477 | 9041-6 | 2026-12-15 |
| 183476 | 9041-5 | 2026-11-15 |
| 183475 | 9041-4 | 2026-10-15 |
| 183474 | 9041-3 | 2026-09-15 |
| 183473 | 9041-2 | 2026-08-15 |
| 183472 | 9041-1 | 2026-07-15 |

### Retorno da API (`limite=3`) — vencimento ascendente

| ID_BOLETO_GERADO | NUMERO | dt_vencimento | Tem link? |
|------------------|--------|---------------|-----------|
| 157582 | 5471-12 | 2026-06-15 | Não |
| 183484 | 8115-1 | 2026-07-15 | Não |
| 183485 | 8115-2 | 2026-08-15 | Não |

### Divergência na mesma data de vencimento

| dt_vencimento | No banco (com link, não retornado) | Na API (sem link, retornado) |
|---------------|------------------------------------|------------------------------|
| 2026-07-15 | 183472 — 9041-1 | 183484 — 8115-1 |
| 2026-08-15 | 183473 — 9041-2 | 183485 — 8115-2 |

---

## Referência

Relacionado ao bug report: [bug-report-api-fatura-boletos.md](./bug-report-api-fatura-boletos.md)
