# 🧬 LOWAS — AI Agents Directory

<div align="center">

[![Deploy status](https://img.shields.io/badge/Deploy-Production--Ready-8B00FF?style=for-the-badge&logo=vercel&logoColor=white)](https://lowas-floriani.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-C026FF?style=for-the-badge)](https://github.com/FFloriani/lowas/blob/master/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/1b9hbqniv1)

### 🪐 An ultra-premium, fast, and responsive directory of AI Agents across CrewAI, AutoGen, Agno, and LangGraph.

[**Access the Live Directory**](https://lowas-floriani.vercel.app)

</div>

---

## 📸 Overview

**LOWAS** is a high-performance single-page catalog curating advanced AI Agents across the most popular development frameworks (CrewAI, AutoGen, Agno, and LangGraph). Designed with a premium deep-dark aesthetic, it provides users with instantaneous filtering, detailed agent breakdowns, practical application use cases, and deployment-ready templates.

---

## 🎨 Key Features

- **Instant Search & Filtering:** Filter agents by framework or sector in milliseconds without page reloads.
- **Interactive Framework Metrics:** Dynamic counters showing the distribution of agents across active frameworks in real time.
- **Premium Interface Design:** A sleek, responsive layout built for all viewports (from mobile screens to ultrawide displays) featuring smooth transitions, clean typography, and a modern dark theme.
- **Staggered Animations:** Card list items reveal themselves with an organic, smooth loading delay for enhanced UX feedback.
- **Local Storage Telemetry:** Privacy-first architecture storing only essential search preferences locally on your browser.

---

## 🛡️ Privacy & LGPD Compliance

LOWAS values privacy and fully complies with the data minimization principles under the Brazilian General Data Protection Law (LGPD, Law nº 13.709/2018):
1. **Interactive Storage Dashboard:** Transparently check exactly what data is stored in your browser's local storage (e.g., search queries, framework filter, or theme choices).
2. **Right to Erasure (Art. 18):** A single-click database purge option allows users to instantly wipe all local data stored by the app.
3. **Glassmorphic Consent Banner:** A non-intrusive, clean disclaimer describing active cookie and storage policies.

---

## ⚙️ Architecture & Build Pipeline

The project relies on a lightweight Node.js compiler to keep the static client runtime fast and optimized:

```
LOWAS/
├── 📁 site/                      <-- Serves the static production website
│   └── 📄 index.html             <-- The compiled, fast single-page app (SPA)
│
├── 📄 lista_agents.csv           <-- Raw UTF-8 CSV database of agents
├── ⚙️ gerar_html.js              <-- Node.js template compiler script
├── ⚙️ gerar_sheets.js            <-- Script for initial spreadsheet sync
└── 📄 README.md                  <-- Project documentation
```

### The Build Process (`gerar_html.js`):
1. Reads and parses `lista_agents.csv` securely.
2. Cross-references rows with an inline curated dictionary containing complex setups, code installation scripts, and practical descriptions.
3. Generates and outputs a highly optimized `site/index.html` file ready to be served.

---

## 🛠️ Tech Stack

- **Client:** HTML5, CSS3 Custom Properties, ES6+ Javascript.
- **Build System:** Node.js (Core `fs` and `path` modules).
- **Deployment:** Vercel continuous deployment.

---

## 🚀 Local Setup

To compile the project or run it locally, no external npm packages are required:

1. **Recompile the Catalog:**
   ```bash
   node gerar_html.js
   ```
2. **Open the Site:**
   Open `site/index.html` in any web browser or use a live server extension.

---

## ☕ Support the Project

If you find this project useful, consider buying me a coffee to support further updates and improvements!

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/1b9hbqniv1)

**Felipe Floriani**  
*Creator & UX Lead Developer*

</div>

