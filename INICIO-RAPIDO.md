# 🚀 Guia de Início Rápido - Rio Cordas Astro

## Passos para rodar o projeto:

### 1️⃣ Instalar Dependências
Abra o terminal nesta pasta e execute:
```bash
npm install
```

### 2️⃣ Copiar Imagens
Execute o arquivo `copiar-imagens.bat` clicando duas vezes nele, OU execute manualmente:
```bash
copiar-imagens.bat
```

### 3️⃣ Iniciar o Servidor
```bash
npm run dev
```

O site estará disponível em: **http://localhost:4321**

---

## 📋 Checklist

- [ ] Node.js instalado (versão 18 ou superior)
- [ ] Dependências instaladas (`npm install`)
- [ ] Imagens copiadas (executar `copiar-imagens.bat`)
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Site acessível em http://localhost:4321

---

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
```

### Produção
```bash
npm run build        # Cria build otimizado
npm run preview      # Visualiza build de produção
```

### Verificação
```bash
npm run astro check  # Verifica erros no código
```

---

## 📁 Estrutura de Componentes

Todos os componentes estão em `src/components/`:

- **Header.astro** - Navegação principal
- **Hero.astro** - Banner principal com CTA
- **About.astro** - Seção "Sobre Nós"
- **Videos.astro** - Galeria de vídeos com lightbox
- **Services.astro** - Serviços oferecidos
- **Testimonials.astro** - Depoimentos de clientes
- **CTA.astro** - Call-to-Action final
- **Footer.astro** - Rodapé
- **ContactModal.astro** - Modal de formulário
- **WhatsAppButton.astro** - Botão flutuante WhatsApp

---

## 🎨 Personalização

### Cores (em `src/layouts/Layout.astro`)
```css
--accent-color: #f23c00;  /* Laranja principal */
--black: #000000;
--white: #ffffff;
--light-gray: #f8f8f8;
```

### Fontes
- **Títulos**: Playfair Display
- **Texto**: Montserrat

---

## 📧 Integração Baserow

O formulário de contato está integrado com Baserow. Para alterar:

1. Abra `src/components/ContactModal.astro`
2. Encontre a função `submitToBaserow()`
3. Altere `apiToken` e URL da tabela conforme necessário

---

## 🌐 Deploy

Para fazer deploy do site:

1. Execute o build:
```bash
npm run build
```

2. A pasta `dist/` conterá todos os arquivos estáticos

3. Faça upload da pasta `dist/` para seu servidor ou use plataformas como:
   - Vercel
   - Netlify
   - GitHub Pages
   - Cloudflare Pages

---

## ❓ Problemas Comuns

### Imagens não aparecem
✅ Execute `copiar-imagens.bat` para copiar as imagens

### Erro ao instalar dependências
✅ Certifique-se de ter Node.js 18+ instalado

### Porta 4321 já está em uso
✅ Use `npm run dev -- --port 3000` para usar outra porta

---

## 📞 Suporte

Para dúvidas sobre o projeto, consulte a documentação do Astro:
https://docs.astro.build
