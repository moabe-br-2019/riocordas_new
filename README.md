# Rio Cordas - Site Astro

Site profissional para o Grupo Rio Cordas, músicos para casamentos e eventos no Rio de Janeiro.

## 🚀 Estrutura do Projeto

```
/
├── public/
│   └── imgs/          # Imagens do site (copiar do projeto original)
├── src/
│   ├── components/    # Componentes Astro reutilizáveis
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Videos.astro
│   │   ├── Services.astro
│   │   ├── Testimonials.astro
│   │   ├── CTA.astro
│   │   ├── Footer.astro
│   │   ├── ContactModal.astro
│   │   └── WhatsAppButton.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── package.json
└── astro.config.mjs
```

## 🧞 Comandos

Todos os comandos são executados na raiz do projeto, a partir de um terminal:

| Comando                   | Ação                                           |
| :------------------------ | :--------------------------------------------- |
| `npm install`             | Instala as dependências                        |
| `npm run dev`             | Inicia servidor local em `localhost:4321`      |
| `npm run build`           | Cria build de produção em `./dist/`            |
| `npm run preview`         | Visualiza build localmente antes do deploy     |

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Copie as imagens do projeto original:
```bash
# Copie a pasta imgs do projeto original para public/imgs
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🌟 Recursos

- ⚡️ Astro 4.x para máxima performance
- 🎨 Design responsivo e moderno
- 📱 Menu mobile hambúrguer
- 🎥 Lightbox de vídeos do YouTube
- 📧 Formulário de contato integrado com Baserow
- 💬 Botão flutuante do WhatsApp
- 🔍 SEO otimizado com Schema.org
- ♿ Acessível (ARIA labels)

## 🎯 Funcionalidades

- Hero section com call-to-action
- Seção Sobre com estatísticas
- Galeria de vídeos com lightbox
- Serviços oferecidos
- Depoimentos de clientes
- Formulário de contato com validação
- Integração com API Baserow
- Botão WhatsApp flutuante
- Navegação suave (smooth scroll)

## 📝 Notas

- As imagens precisam ser copiadas manualmente da pasta `imgs` do projeto original
- Cores principais: Laranja (#f23c00), Preto (#000000), Branco (#ffffff)
- Fontes: Playfair Display (títulos) e Montserrat (corpo)
