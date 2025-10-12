# 🚀 GUIA DE DEPLOY - GITHUB + CLOUDFLARE

## Passo 1: Preparar o Projeto

### ✅ Verificar se está tudo funcionando localmente
```bash
npm run build
npm run preview
```

Se funcionar corretamente, está pronto para deploy!

---

## Passo 2: Subir para o GitHub

### 1. Inicializar Git (se ainda não foi feito)
```bash
git init
```

### 2. Adicionar todos os arquivos
```bash
git add .
```

### 3. Fazer o primeiro commit
```bash
git commit -m "Initial commit - Rio Cordas Astro"
```

### 4. Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `riocordas-astro` (ou outro nome)
3. **NÃO** marque "Add a README file"
4. **NÃO** adicione .gitignore (já temos)
5. Clique em "Create repository"

### 5. Conectar e enviar para o GitHub

Copie os comandos que aparecem na tela do GitHub, algo como:

```bash
git remote add origin https://github.com/SEU-USUARIO/riocordas-astro.git
git branch -M main
git push -u origin main
```

**Ou use SSH (recomendado):**
```bash
git remote add origin git@github.com:SEU-USUARIO/riocordas-astro.git
git branch -M main
git push -u origin main
```

---

## Passo 3: Deploy na Cloudflare Pages

### 1. Acessar Cloudflare Pages

1. Acesse: https://dash.cloudflare.com/
2. Faça login (ou crie uma conta gratuita)
3. Vá em **Pages** no menu lateral
4. Clique em **Create a project**

### 2. Conectar com GitHub

1. Clique em **Connect to Git**
2. Escolha **GitHub**
3. Autorize o Cloudflare a acessar seus repositórios
4. Selecione o repositório `riocordas-astro`

### 3. Configurar o Build

Preencha os campos:

**Project name:** `riocordas` (ou outro nome)

**Production branch:** `main`

**Framework preset:** Selecione **Astro**

**Build command:**
```bash
npm run build
```

**Build output directory:**
```bash
dist
```

**Root directory (opcional):** deixe vazio

**Environment variables:** deixe vazio (por enquanto)

### 4. Fazer Deploy

1. Clique em **Save and Deploy**
2. Aguarde o build (leva 1-3 minutos)
3. Quando finalizar, você verá uma URL como:
   ```
   https://riocordas.pages.dev
   ```

🎉 **Seu site está no ar!**

---

## Passo 4: Configurar Domínio Personalizado (Opcional)

### Se você tem um domínio (riocordas.com.br):

1. No Cloudflare Pages, vá em **Custom domains**
2. Clique em **Set up a custom domain**
3. Digite: `riocordas.com.br`
4. Siga as instruções para configurar DNS

**Se o domínio já está na Cloudflare:**
- A configuração é automática!

**Se o domínio está em outro provedor:**
- Você precisará adicionar registros DNS (A ou CNAME)

---

## Passo 5: Atualizações Futuras

### Quando fizer alterações no projeto:

```bash
# 1. Fazer as alterações
# 2. Adicionar ao Git
git add .

# 3. Commit
git commit -m "Descrição das alterações"

# 4. Enviar para GitHub
git push
```

**A Cloudflare fará deploy automático!** 🚀

---

## Estrutura de Branches (Recomendado)

### Estratégia simples:

```bash
main        # Produção (deploy automático)
develop     # Desenvolvimento
```

### Para trabalhar em features:

```bash
# Criar branch de desenvolvimento
git checkout -b develop

# Fazer alterações e commit
git add .
git commit -m "Nova feature"

# Enviar para GitHub
git push origin develop

# Quando estiver pronto, fazer merge na main
git checkout main
git merge develop
git push
```

---

## Verificações Pré-Deploy

### ✅ Checklist antes de fazer push:

- [ ] `npm run build` funciona sem erros
- [ ] `npm run preview` mostra o site corretamente
- [ ] Todas as imagens estão em `/public/imgs/`
- [ ] Links internos funcionam
- [ ] Modal de contato funciona
- [ ] Menu responsivo funciona
- [ ] Blog carrega corretamente

---

## Comandos Úteis

### Ver status do Git
```bash
git status
```

### Ver histórico de commits
```bash
git log --oneline
```

### Desfazer alterações não commitadas
```bash
git checkout -- .
```

### Criar e mudar para nova branch
```bash
git checkout -b nome-da-branch
```

### Voltar para a branch main
```bash
git checkout main
```

---

## Troubleshooting

### Erro: "Build failed"

1. Verifique os logs no Cloudflare
2. Execute `npm run build` localmente
3. Corrija os erros
4. Faça commit e push novamente

### Erro: "Images not loading"

- Certifique-se que todas as imagens estão em `/public/`
- Use caminhos relativos: `/imgs/imagem.jpg`

### Erro: "Module not found"

- Execute `npm install` localmente
- Verifique o `package.json`
- Faça commit do `package.json` e `package-lock.json`

---

## URLs Importantes

- **GitHub:** https://github.com/SEU-USUARIO/riocordas-astro
- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **Site em produção:** https://riocordas.pages.dev

---

## Configurações Avançadas (Opcional)

### Variáveis de Ambiente na Cloudflare

Se precisar de variáveis de ambiente:

1. Vá em **Settings** > **Environment variables**
2. Adicione as variáveis necessárias
3. Exemplo:
   ```
   BASEROW_API_TOKEN=seu-token-aqui
   ```

### Custom Headers

Para adicionar headers de segurança, crie um arquivo:

**`public/_headers`**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### Redirects

Para configurar redirects, crie:

**`public/_redirects`**
```
/old-page  /new-page  301
```

---

## Performance

A Cloudflare Pages oferece:
- ✅ CDN global gratuito
- ✅ SSL/HTTPS automático
- ✅ Deploy automático
- ✅ Preview de branches
- ✅ Rollback fácil
- ✅ Analytics básico

---

## Suporte

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Astro Docs:** https://docs.astro.build/
- **GitHub Docs:** https://docs.github.com/

---

**Seu site estará no ar em menos de 10 minutos!** 🎉
