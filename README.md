# 🧬 LOWAS — AI Agents Universe

<div align="center">

[![Deploy status](https://img.shields.io/badge/Deploy-Production--Ready-8B00FF?style=for-the-badge&logo=vercel&logoColor=white)](https://lowas-agents.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-C026FF?style=for-the-badge)](https://github.com/FFloriani/decreepy-agents-search/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/FFloriani)

### 🪐 An ultra-premium, highly immersive directory of AI Agents across CrewAI, AutoGen, Agno, and LangGraph ecosystems.

[**Explore the Live Universe**](https://lowas-agents.vercel.app)

</div>

---

## 📸 Overview

**LOWAS — AI Agents Universe** is a state-of-the-art, single-page application directory curating over **86 advanced AI Agents** across popular frameworks. Built upon the premium **"Espelho do Universo" (Mirror of the Universe)** design system, the platform features deep dark cosmic aesthetics, real-time statistics, modular tabs, high-fidelity responsive layouts, and gamified engagement mechanics.

---

## 🎨 Visual Identity: "Espelho do Universo"

The user interface delivers a premium, immersive digital experience leveraging state-of-the-art frontend styling:
- **Cosmic Dark Mode:** Deep, void-like black background (`#050507`) blended with soft HSL glowing radial gradients simulating distant nebulas.
- **Dynamic Starfield:** An interactive, hardware-accelerated HTML5 Canvas particle system rendering shimmering multi-colored stars (cyan, violet, and gold).
- **Responsive Layout:** Engineered starting from a strict 9:16 portrait viewport base, scaling seamlessly into elegant ultrawide grid columns.
- **Horizontal Swipeable Filters:**sleek touch-friendly pill buttons with web-safe dynamic horizontal scrolling to prevent wrapping and preserve layout cleanliness on mobile devices.
- **Staggered Entry Transitions:** Progressive CSS `@keyframes fadeInUp` loading animations, assigning staggered delays to card items for a beautiful, organic layout reveal.

---

## 🌌 "Stellar Summon" Gacha System (AAA Gamification)

LOWAS incorporates an engaging, high-fidelity **Stellar Summon (Invocação Estelar)** gacha simulator to encourage exploration and user retention:
- **Summon Orb:** A central, interactive glowing plasma core that triggers agent discovery with custom CSS keyframes.
- **Persistent Pity Tracker:** Integrated directly into `localStorage`. A standard 10-summon pity bar guarantees a manually curated, rich-detailed agent profile on the 10th summon.
- **Web Audio API Synth:** Renders real-time, synthetically generated cosmic soundscapes and sweeps directly in the browser. Emits majestic, bright harmonic chords during **Epic Summons** (rare curated agents).
- **Reveal Modal:** Features a premium holographic overlay with luminescent frames tailored to the agent's specific framework and rarity (gold frames for epic summons).

---

## 🛡️ Robust LGPD Privacy Compliance (Art. 18 Compliant)

LOWAS is committed to strict data minimization principles under the Brazilian General Data Protection Law (LGPD, Law nº 13.709/2018):
1. **Cookie Consent Banner:** A gorgeous glassmorphic bottom banner detailing active storage policies. Smoothly fades in and completely disables click-blocking pointer events when closed.
2. **Autodeterminação Informativa Dashboard:** A live, interactive dashboard displaying exactly what variables are stored locally (e.g., scanline preference, search queries, pity count).
3. **Data Scrubber:** A single-click complete purge function (`localStorage.clear()`) to execute the right to erasure under Art. 18.
4. **Active DPO Channel:** Direct contact endpoint for user privacy enquiries.

---

## ⚙️ Architecture & Build Pipeline

The repository uses a highly decoupled, lightweight compiler architecture to build the distribution site static code:

```
LOWAS/
├── 📁 site/                      <-- Isolated production static directory
│   └── 📄 index.html             <-- Generated single-file ultra-fast SPA (86 agents)
│
├── 📄 lista_agents.csv           <-- Curated UTF-8 BOM CSV database (Excel safe)
├── ⚙️ gerar_html.js              <-- Node.js template compiler script
├── ⚙️ gerar_sheets.js            <-- Script for initial spreadsheet extraction
└── 📄 README.md                  <-- Project documentation
```

### The Compiler Pipeline (`gerar_html.js`):
1. **CSV Parsing:** Parses `lista_agents.csv` using a custom RFC-4180 parser, keeping track of UTF-8 BOM markers.
2. **Data Merging:** Cross-references rows with an inline dictionary of 39 manual curated agents (`curatedData`) containing highly rich mechanical breakdowns and installation scripts.
3. **Template Compilation:** Evaluates counts, sets staggered animation parameters, processes responsive CSS blocks, and exports the optimized single-file `site/index.html`.

---

## 🛠️ Technologies Used

- **Client Runtime:** Vanilla HTML5, CSS3 Variables, ES6 JavaScript.
- **Audio & Animations:** HTML5 Web Audio API, Canvas 2D API, Hardware-Accelerated CSS Transitions.
- **Build Utilities:** Node.js (Core `fs` and `path` modules).
- **Deployment:** Vercel continuous git-integration.

---

## 🚀 Quick Start (Local Run)

No external packages or package.json dependencies are required to run the compiler:

1. **Recompile the Site:**
   ```bash
   node gerar_html.js
   ```
2. **View Locally:**
   Simply double-click `site/index.html` or run any local live server extension to explore.

---

## 📄 License

This software is developed by **LOWAS Team** and is released under the **MIT License**. Feel free to use, modify, and distribute for commercial or academic applications.

---

## ☕ Support

If you love this project, consider buying me a coffee! Your support helps fuel further cosmic developments.

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/FFloriani)

**Felipe Floriani**  
*Creator & UX Lead Developer*

</div>
