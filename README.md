# 🧬 Decreepy Agents Search (DAS) — Database Premium de Agentes IA

> **Status:** Live & Deployado no Vercel (Production-ready)  
> **Acesse o App:** [decreepy-agents-search.vercel.app](https://decreepy-agents-search.vercel.app)

---

## 📸 Visão Geral
**Decreepy Agents Search (DAS)** é um diretório de busca interativo e ultra-premium de **Agentes Inteligentes de IA**, com foco nos ecossistemas **CrewAI, AutoGen, Agno (Phidata) e LangGraph**. 

O projeto foi construído sob uma **estética Vaporwave Cyberpunk / Retro-Neon verde escura**, oferecendo um visual cibernético com grid 3D animado e efeito Scanline CRT chaveável.

---

## 🛡️ Conformidade e Compliance LGPD (Lei nº 13.709/2018)
O projeto conta com uma das mais robustas implementações locais de **Conformidade Geral de Proteção de Dados (LGPD)** do ecossistema:
1. **Cookie Consent Banner:** Informativo flutuante de vidro (*glassmorphism*) focado na coleta mínima (localStorage).
2. **Painel de Autodeterminação Informativa:** Tabela interativa ao vivo no browser mostrando exatamente cada variável salva localmente (tema, query de busca).
3. **Scrubber de Dados:** Botão para remoção de todos os dados locais com um único clique (Direito de eliminação do Art. 18).
4. **DPO / Encarregado de Dados:** Canal aberto no front-end para atendimento de direitos.

---

## ⚙️ Arquitetura do Projeto
O projeto foi estruturado seguindo as melhores práticas de isolamento e engenharia de software:

```
Ai Agents/
├── 📁 site/                      <-- Front-end isolado para produção (HTML5/CSS3/JS)
│   └── 📄 index.html             <-- Single Page App de produção ultra-rápida (86 agentes)
│
├── 📄 lista_agents.csv           <-- Planilha/Banco de dados local curado com os agentes
├── ⚙️ gerar_html.js              <-- Compilador Node.js que mescla o CSV + Curadoria e gera o site
├── ⚙️ gerar_sheets.js            <-- Script de extração da planilha inicial de dados
└── 📄 .gitignore                 <-- Exclusão de logs, sub-módulos e documentação legada
```

---

## 🛠️ Tecnologias Utilizadas
- **Core:** HTML5, CSS3 Vanilla, JavaScript Moderno.
- **Hospedagem & Nuvem:** Vercel (Deploy contínuo focado na pasta `/site`).
- **Automação & Compilação:** Node.js (File System & CSV Parser).
- **Design:** Google Fonts (Orbitron, Share Tech Mono, Inter), Backdrop blur, Neumorphism e Grid 3D CSS.

---

## 🚀 Como Executar Localmente
1. **Instalar Dependências:**
   O projeto não exige dependências de terceiros no runtime do cliente. O Node.js padrão realiza a compilação:
   ```bash
   node gerar_html.js
   ```
2. **Visualizar o Site:**
   Basta abrir o arquivo `site/index.html` em qualquer navegador moderno.

---

## 📄 Licença
Desenvolvido por **DAS Team**. Livre para uso comercial e acadêmico.
