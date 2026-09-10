# 🧠 DataMind Academy

> A full-featured educational website for SQL, Power BI, Python, Machine Learning & AI.

## 🚀 Open in GitHub Codespaces (Recommended — No Local Install Needed)

1. Push this folder to a GitHub repository (see steps below)
2. On the GitHub repo page click **Code → Codespaces → Create codespace on main**
3. Wait ~2 minutes — VS Code opens in your browser with everything pre-installed
4. The Next.js dev server starts automatically at `http://localhost:3000`

---

## 📁 Project Structure

```
Learning/
├── .devcontainer/
│   └── devcontainer.json      ← Codespaces config (auto-installs everything)
├── website/
│   └── datamind-academy/      ← Next.js 14 website
│       ├── src/
│       │   ├── app/           ← Pages (App Router)
│       │   ├── components/    ← UI components
│       │   └── lib/           ← Data, types, utilities
│       ├── package.json
│       ├── tailwind.config.js
│       └── next.config.js
├── sql-track/                 ← SQL lessons & practice databases
├── python-track/              ← Python scripts & notebooks
├── ml-track/                  ← ML notebooks & models
├── ai-track/                  ← Deep learning notebooks
├── powerbi-track/             ← Power BI .pbix files
└── datasets/                  ← Shared CSV/JSON datasets
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Primitives | Radix UI |
| Code Editor | Monaco Editor |
| Icons | Lucide React |
| Charts | Recharts |
| Animations | Framer Motion |

---

## 📤 How to Push to GitHub (One-Time Setup)

### Step 1 — Install Git
Download from https://git-scm.com/download/win and install.

### Step 2 — Create a GitHub repository
1. Go to https://github.com/new
2. Name it `datamind-academy`
3. Leave it **Public** (required for free Codespaces)
4. Do NOT initialize with README — click **Create repository**

### Step 3 — Push from PowerShell
```powershell
cd "H:\antigravity project\Learning"

git init
git add .
git commit -m "Initial commit — DataMind Academy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/datamind-academy.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub username.

### Step 4 — Open Codespaces
GitHub repo → **Code** button → **Codespaces** tab → **Create codespace on main**

---

## 🌐 Subjects Covered

| Subject | Levels | Hours |
|---------|--------|-------|
| 🗄️ SQL | Beginner → Advanced | ~40h |
| 📊 Power BI | Beginner → Advanced | ~45h |
| 🐍 Python | Beginner → Advanced | ~60h |
| 🤖 Machine Learning | Beginner → Advanced | ~80h |
| 🧠 Artificial Intelligence | Beginner → Advanced | ~100h |
