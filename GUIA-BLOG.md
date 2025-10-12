# 📝 Como Criar Novos Posts no Blog

## Estrutura do Post

Todos os posts devem ser criados na pasta:
```
src/content/blog/
```

## Formato do Arquivo

### Nome do arquivo:
Use o padrão: `nome-do-post.md`

Exemplo: `dicas-musica-casamento.md`

### Estrutura Básica (Frontmatter + Conteúdo):

```markdown
---
title: "Título do Seu Post Aqui"
description: "Descrição curta e atrativa do post (150-160 caracteres)"
pubDate: 2025-01-20
author: "Grupo Rio Cordas"
image: "/imgs/sua-imagem.jpg"
tags: ["casamento", "música", "dicas"]
draft: false
---

Seu conteúdo em Markdown começa aqui...

## Seções do Post

Use headings (##, ###) para organizar o conteúdo.

### Subseções

Adicione parágrafos, listas, imagens, etc.
```

## Campos Obrigatórios

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| **title** | Título do post | "Como Escolher Músicas para Casamento" |
| **description** | Resumo (SEO) | "Descubra as melhores dicas..." |
| **pubDate** | Data de publicação | 2025-01-20 |
| **author** | Autor do post | "Grupo Rio Cordas" |
| **image** | Imagem destaque | "/imgs/casamento.jpg" |
| **tags** | Palavras-chave | ["casamento", "música"] |
| **draft** | Rascunho? | false (publicado) / true (oculto) |

## Exemplo Completo

```markdown
---
title: "5 Erros Comuns ao Escolher Música para Casamento"
description: "Evite esses erros e garanta que a trilha sonora do seu casamento seja perfeita!"
pubDate: 2025-01-20
author: "Grupo Rio Cordas"
image: "/imgs/casamento.jpg"
tags: ["casamento", "música", "dicas", "erros"]
draft: false
---

Escolher a música para o casamento pode ser desafiador. Veja os 5 erros mais comuns!

## 1. Não Considerar a Acústica do Local

Muitos casais esquecem de testar como a música soa no espaço real.

### Como evitar:
- Visite o local antes
- Converse com os músicos
- Faça um teste de som

## 2. Escolher Músicas Muito Longas

Músicas de 6+ minutos podem cansar os convidados.

**Dica:** Prefira versões de 3-4 minutos.

## 3. Ignorar o Gosto dos Convidados

Lembre-se que há diferentes gerações presentes.

### Solução:
Crie um mix que agrade a todos!

---

**Precisa de ajuda?**  
📞 (21) 97552-5707
```

## Markdown Suportado

### Títulos
```markdown
# H1 - Título Principal
## H2 - Seção
### H3 - Subseção
```

### Formatação de Texto
```markdown
**negrito**
*itálico*
~~riscado~~
```

### Listas

**Lista com marcadores:**
```markdown
- Item 1
- Item 2
  - Subitem
```

**Lista numerada:**
```markdown
1. Primeiro
2. Segundo
3. Terceiro
```

### Links e Imagens
```markdown
[Texto do link](https://exemplo.com)
![Alt da imagem](/imgs/imagem.jpg)
```

### Citações
```markdown
> Texto em destaque ou citação
```

### Linha Horizontal
```markdown
---
```

### Tabelas
```markdown
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor 1  | Valor 2  | Valor 3  |
```

## Dicas de SEO

### 1. Título
- Use entre 50-60 caracteres
- Inclua palavras-chave principais
- Seja descritivo e atrativo

### 2. Descrição
- Entre 150-160 caracteres
- Resuma o conteúdo
- Inclua call-to-action

### 3. Tags
- Use 3-6 tags relevantes
- Inclua palavras-chave
- Seja específico

### 4. Imagem
- Use imagens de alta qualidade
- Coloque na pasta `/public/imgs/`
- Nome descritivo (ex: `musica-casamento-violino.jpg`)

## Workflow Completo

### 1. Criar o arquivo
```bash
src/content/blog/meu-novo-post.md
```

### 2. Adicionar frontmatter
```yaml
---
title: "Seu Título"
description: "Sua descrição"
pubDate: 2025-01-20
author: "Grupo Rio Cordas"
image: "/imgs/imagem.jpg"
tags: ["tag1", "tag2"]
draft: false
---
```

### 3. Escrever o conteúdo
Use Markdown para formatar seu texto

### 4. Salvar e testar
```bash
npm run dev
```

### 5. Acessar
```
http://localhost:4321/blog/
```

## Publicar ou Ocultar

### Para publicar:
```yaml
draft: false
```

### Para manter como rascunho:
```yaml
draft: true
```

Posts com `draft: true` não aparecem no blog.

## Estrutura de Diretórios

```
riocordas_astro/
├── src/
│   ├── content/
│   │   ├── blog/              ← Seus posts aqui!
│   │   │   ├── post-1.md
│   │   │   ├── post-2.md
│   │   │   └── post-3.md
│   │   └── config.ts          ← Configuração
│   ├── pages/
│   │   └── blog/
│   │       ├── index.astro    ← Lista de posts
│   │       └── [slug].astro   ← Página individual
└── public/
    └── imgs/                   ← Imagens dos posts
```

## Recursos Úteis

- **Markdown Guide**: https://www.markdownguide.org/
- **Astro Content Collections**: https://docs.astro.build/en/guides/content-collections/
- **SEO Best Practices**: https://moz.com/beginners-guide-to-seo

## Exemplos de Posts

Veja os posts de exemplo já criados:
- `como-escolher-musicas-casamento.md`
- `quarteto-vs-orquestra-casamento.md`
- `musicas-populares-casamento.md`

Use-os como referência para criar seus próprios posts!

---

**Dúvidas?** Consulte este guia ou a documentação do Astro.
