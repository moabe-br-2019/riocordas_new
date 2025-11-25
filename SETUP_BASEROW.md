# Configuração do Baserow para Desenvolvimento Local

## O que você precisa fazer

### 1. Gerar Token do Baserow

1. Acesse https://baserow.io/
2. Faça login na sua conta
3. Vá em **Settings** (canto superior direito)
4. Clique em **API tokens**
5. Clique em **Create new token**
6. Dê um nome para o token (ex: "Rio Cordas Dev")
7. Copie o token gerado

### 2. Configurar o arquivo `.env.local`

1. Na raiz do projeto, abra o arquivo `.env.local`
2. Substitua `seu_token_baserow_aqui` pelo token que você copiou

```
BASEROW_API_TOKEN=seu_token_aqui
```

### 3. Confirmar IDs das Tabelas

Os IDs das tabelas estão configurados em `functions/api/valores.ts`:
- **Tabela de Preços**: `258305`
- **Tabela de Pacotes**: `258304`

Se seus IDs forem diferentes, atualize em `functions/api/valores.ts` linhas 30 e 65.

### 4. Rodar o Projeto Localmente

```bash
npm run dev
```

Acesse `http://localhost:3000/valores` no navegador.

## Como Verificar

Abra o console do navegador (F12) e vá em **Network**:
1. Recarregue a página `/valores`
2. Procure pela requisição para `/api/valores`
3. Veja se recebeu `status 200` e dados em JSON

Se vir erro `500` ou HTML, o token pode estar:
- ❌ Inválido
- ❌ Expirado
- ❌ Com permissões insuficientes

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `BASEROW_API_TOKEN` | Token de autenticação do Baserow | `xRqbdD2SaZxxxxxxxxxxxxxYZAbc` |

