<div align="center">

# ⚡ Repo-Intel

### Open Source Architecture Intelligence

**Zero setup. No installation. Just paste a GitHub URL.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[**Report Bug**](https://github.com/ravimildseven/repo-intel/issues) · [**Request Feature**](https://github.com/ravimildseven/repo-intel/issues)

<img src="./screenshot.png" alt="Repo-Intel Screenshot" width="100%"/>

</div>

---

## Why Repo-Intel?

Ever opened a new codebase and felt completely lost? **Repo-Intel** turns any GitHub repository or local codebase into an interactive architecture map in seconds.

- **No installation required** — runs entirely in your browser
- **No data collection** — your code never leaves your machine
- **No accounts** — just paste a URL or select local files and go
- **Works offline** — analyze local files without internet

```
⚡ Paste URL / Open Folder → See Architecture → Make Better Decisions
```

---

## Features

### 🏗️ **Architecture Analysis**
Dependency graphs, call chains, layer detection, circular dependency finding, blast-radius calculation. Click any file to see exactly what breaks if you change it.

### 🛡️ **Security Scanning**
12+ vulnerability patterns (hardcoded secrets, SQL injection, SSRF, path traversal, open redirect, permissive CORS, insecure deserialization, eval, .env exposure) plus **GitHub CodeQL, Dependabot, and Secret Scanning alert integration** (optional, when PAT has required scopes).

### 📊 **7 Visualizations**
| Mode | Description |
|------|-------------|
| **Force Graph** | Interactive force-directed dependency graph (5 layouts: force, radial, hierarchical, grid, metro) |
| **Treemap** | Zoomable file rectangles sized by lines of code |
| **Adjacency Matrix** | Heatmap-style coupling matrix |
| **Dendrogram** | Cluster tree with curved links |
| **Sankey** | Folder-to-folder flow diagram |
| **Disjoint Clusters** | Separate force clusters per folder |
| **Edge Bundling** | Circular hierarchical edge bundling |

### 🔍 **Pattern Detection**
Design patterns (singleton, factory, observer, hooks) and anti-patterns (God objects, high coupling). Code duplication, dead code, tech debt markers from commit messages.

### 👥 **Team Health**
- **Bus Factor** — minimum contributors covering 50% of commits
- **Churn Hotspots** — files changed most frequently correlated with complexity
- **Community Profile** — repo health scoring (README, CONTRIBUTING, LICENSE, issue templates)
- **Contributor Concentration** — knowledge distribution analysis

### 📋 **PR Impact Analysis**
Paste a Pull Request URL to see risk score, blast radius, suggested reviewers, dependency chains, and test impact.

### 📤 **Rich Export**
- **PDF Report** — multi-page with embedded architecture graph, stats, security table, suggestions (uses browser's Print-to-PDF)
- **SVG Image** — export the current visualization
- **JSON / Markdown / Plain Text** — complete analysis data
- **Raw JSON** — simplified data export for CI/CD pipelines

### 🔧 **Smart Defaults**
- Auto-populated **branch dropdown** from GitHub API
- **Analysis presets** — All Files, Production Only, API Surface Only, Recently Changed
- **Exclude patterns** — skip generated code, vendor dirs, assets
- **Findings panel** with search, type/priority/confidence filters

### 💻 **Local File Analysis**
Analyze code from your computer without uploading to GitHub:
- Privacy First: code never leaves your browser
- Offline Support: no internet needed
- Custom Excludes: skip irrelevant paths before scanning

### 📝 **Markdown & Wiki-Link Graph**
Point Repo-Intel at an Obsidian vault or any markdown directory to see notes as a connected graph. Both `[[wiki-links]]` and `[text](./relative.md)` links become edges.

---

## Privacy First

**Your code stays on your machine.** Repo-Intel:

- ✅ Runs 100% in the browser
- ✅ Makes API calls directly from your browser to GitHub
- ✅ Never stores your code or tokens
- ✅ Works with private repos (just add your token locally)
- ✅ No analytics or tracking

Your GitHub token (if used) is only stored in your browser's memory and cleared when you close the tab.

---

## Quick Start

### Option 1: Self-Host / Share with Peers

Repo-Intel is a **static site** — no build step, no server, no `npm install`. Serve the folder with any static file server:

```bash
# Clone the repo
git clone https://github.com/ravimildseven/repo-intel.git
cd repo-intel

# Option A: Python (built-in)
python -m http.server 8080

# Option B: Node (npx, no install)
npx serve .

# Option C: VS Code Live Server extension
# Right-click index.modular.html → "Open with Live Server"

# Then open in browser:
#   http://localhost:8080/index.modular.html
```

> **Why a server?** The modular version loads multiple `.js` files via `<script>` tags. Browsers block this from `file://` due to CORS. A local server (`http://localhost`) works fine. The original single-file `index.html` still works directly from `file://` if you need it.

#### Deploy for your team

| Platform | Steps |
|----------|-------|
| **GitHub Pages** | Push to repo → Settings → Pages → select branch → site is live |
| **Vercel** | `vercel --prod` (zero-config, auto-detects static) |
| **Netlify** | Drag-and-drop the folder, or connect the repo |
| **Any static host** | Upload all files in the root — no build needed |
| **Internal / VPN** | `python -m http.server 8080` on any machine your team can reach |

All files must be in the same directory. No build artifacts, no `dist/` folder.

### Option 2: Analyze Local Files
1. Open Repo-Intel in your browser
2. Click **📁 Open Folder**
3. Configure exclude patterns (optional)
4. Select the folder — analysis runs entirely in your browser

---

## Project Structure

```
codeflow/
├── index.modular.html          ← Entry point (modular version)
├── index.html                  ← Original single-file version (preserved)
├── styles.modular.css          ← All styles
├── app.foundation.modular.js   ← Language defs, layer maps, constants
├── app.core.modular.js         ← Core utilities
├── app.parser.modular.js       ← Parsing, detection, analysis engines
├── app.github.modular.js       ← GitHub API, auth, rate-limit handling
├── app.shared.modular.js       ← Shared React components (HealthRing, etc.)
├── app.main.helpers.modular.js ← URL parsing, syntax highlighting helpers
├── app.main.export.modular.js  ← Export: SVG, PDF, JSON, Markdown, Text
├── app.main.modular.js         ← Main React app (state, analysis, rendering)
├── app.bootstrap.modular.js    ← React root mount
├── app.modular.js              ← Module coordination
└── tests/
    ├── preset-confidence.smoke.js  ← 100+ assertions (features, wiring, exports)
    ├── md-extractors.test.mjs      ← Markdown/wiki-link parser tests
    ├── sync-with-html.test.mjs     ← Modular ↔ original sync checks
    ├── html-inline-script-analysis.smoke.js
    ├── verify-brain-vault.mjs      ← Optional e2e vault test
    └── fixtures/vault/             ← Test markdown files
```

Scripts load in order via `<script defer>` in `index.modular.html`. No bundler, no import maps — just sequential `<script>` tags.

---

## Usage

### Public Repositories
```
Just paste: facebook/react
Or full URL: https://github.com/facebook/react
```
Branches auto-populate when the repo is reachable — select from the dropdown or type manually.

### Private Repositories
1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens) with `repo` scope
2. Select "Token (PAT)" in the auth dropdown
3. Paste your token and analyze

### GitHub App Authentication
For teams and organizations:
1. Create a [GitHub App](https://github.com/settings/apps) with repository permissions
2. Install the app on your org
3. Select "GitHub App" auth, provide App ID and private key

### Security Alerts (Optional)
To see CodeQL, Dependabot, and Secret Scanning alerts, your PAT needs:
- `security_events` scope (for code scanning + dependabot)
- `secret_scanning_alerts` scope (for secret scanning)

If scopes are missing, these features gracefully degrade — no errors, no UI noise.

### Local Files
Click **📁 Open Folder** to analyze code from your computer. When in local mode, the repo input is replaced with a "📁 Local Folder" badge and GitHub-only features (PR analysis, share links) are disabled.

### Export
Click **📤** after analysis for:
- **📑 PDF Report** — opens print dialog with embedded graph + full analysis
- **🖼️ SVG Image** — export the current graph
- **📋 JSON / 📝 Markdown / 📄 Text** — data reports
- **⚙️ Raw JSON** — raw analysis object

---

## Running Tests

```bash
# All tests (no dependencies needed)
node --test tests/

# Smoke tests only (100+ assertions covering all features)
node tests/preset-confidence.smoke.js

# Syntax check all modules
node --check app.main.modular.js
node --check app.parser.modular.js
node --check app.github.modular.js
node --check app.main.export.modular.js
```

---

## Supported Languages

| Language | Extensions |
|----------|------------|
| JavaScript | `.js`, `.jsx` |
| TypeScript | `.ts`, `.tsx` |
| HTML (inline scripts) | `.html`, `.htm`, `.xhtml` |
| Python | `.py` |
| Java | `.java` |
| Go | `.go` |
| Ruby | `.rb` |
| PHP | `.php` |
| Vue | `.vue` |
| Svelte | `.svelte` |
| Rust | `.rs` |
| C | `.c`, `.h` |
| C++ | `.cpp`, `.cc`, `.cxx`, `.hpp`, `.hh`, `.hxx` |
| C# | `.cs` |
| Swift | `.swift` |
| Kotlin | `.kt`, `.kts` |
| Scala | `.scala`, `.sc` |
| Groovy | `.groovy`, `.gvy` |
| Elixir | `.ex`, `.exs` |
| Erlang | `.erl`, `.hrl` |
| Haskell | `.hs`, `.lhs` |
| Lua | `.lua` |
| R | `.r`, `.R` |
| Julia | `.jl` |
| Dart | `.dart` |
| Perl | `.pl`, `.pm` |
| Shell | `.sh`, `.bash`, `.zsh`, `.fish` |
| PowerShell | `.ps1`, `.psm1`, `.psd1` |
| F# | `.fs`, `.fsi`, `.fsx` |
| OCaml | `.ml`, `.mli` |
| Clojure | `.clj`, `.cljs`, `.cljc` |
| Elm | `.elm` |
| VBA | `.vba`, `.bas`, `.cls`, `.xlsm`, `.xlsb`, `.xlam` |

---

## API Limits

| Auth Method | Rate Limit |
|-------------|------------|
| No token | 60 requests/hour |
| Personal Access Token | 5,000 requests/hour |
| GitHub App | 5,000 requests/hour per installation |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Analyze repository |
| `+` / `-` | Zoom in/out |
| `Escape` | Close modal |

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Repo-Intel                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
│  │  Parser    │  │  GitHub    │  │  D3 + SVG  │     │
│  │  Module    │  │  API       │  │  Charts    │     │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘     │
│         │               │               │           │
│         └───────────────┼───────────────┘           │
│                         │                           │
│              ┌──────────▼──────────┐                │
│              │   React App         │                │
│              │  (Modular Scripts)  │                │
│              └─────────────────────┘                │
│                                                      │
│  CDN deps: React 18 · D3 7 · Babel · Tree-sitter   │
│  Zero npm install · Zero build step                  │
└──────────────────────────────────────────────────────┘
```

---

## Contributing

1. Fork the repo
2. Make your changes (edit the relevant `.modular.js` file)
3. Run `node --check <file>` and `node tests/preset-confidence.smoke.js`
4. Test locally with a static file server
5. Submit a PR

If editing the markdown/wiki-link parser, Node.js tests live under `tests/` and run with no dependencies:

```bash
node --test tests/
```

### Ideas for Contributions
- [ ] Multi-repo comparison analysis
- [ ] Add support for more languages
- [ ] Improve function extraction regex
- [ ] Add more design pattern detection
- [ ] Add code complexity metrics (cyclomatic, cognitive)

---

## FAQ

**Q: How does it work without a backend?**
> Repo-Intel runs entirely in your browser. It calls the GitHub API directly and processes everything client-side using React, D3, and Tree-sitter WASM.

**Q: Can I still share it as a single file?**
> The original `index.html` is preserved and still works as a standalone file (open directly from `file://`). The modular `index.modular.html` requires a local HTTP server but is easier to develop and maintain.

**Q: Is my code safe?**
> Yes. Code is fetched directly from GitHub to your browser. Nothing is sent to any server. Click the ⚡ logo to see the full privacy & features overview.

**Q: Can I use it offline?**
> Yes. Click **📁 Open Folder** to analyze local code without internet. All processing happens in your browser.

**Q: Why does the modular version need a server?**
> Browsers block `<script src="...">` from `file://` origins due to CORS. Any local server (`python -m http.server`, `npx serve`, VS Code Live Server) fixes this.

**Q: Why is analysis slow?**
> We make individual API calls per file for content and commits. Use a PAT for 5,000 requests/hour instead of 60.

**Q: How do I get CodeQL/Dependabot/Secret Scanning alerts?**
> Add `security_events` and `secret_scanning_alerts` scopes to your PAT. If scopes are missing, these features silently skip — no errors.

---

## Star History

If you find Repo-Intel useful, please ⭐ the repo!

---

## License

MIT License — use it however you want.

---

<div align="center">

**Built with ⚡ by developers, for developers**

*Stop guessing. Start seeing your architecture.*

</div>
