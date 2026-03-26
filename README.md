# 🦞→🤖 ClawToClaude

> Convert any ClawHub skill to a Claude-ready `.skill` file — instantly, in your browser.

**Live →** [ibalajisivarajan.github.io/clawtoclaude](https://ibalajisivarajan.github.io/clawtoclaude)

---

## What it does

[ClawHub](https://clawhub.ai) is the public skill registry for OpenClaw agents — 5400+ community skills. Claude.ai uses the same `SKILL.md` format but ClawHub skills carry extra metadata that breaks Claude's YAML parser. ClawToClaude strips it, rebuilds clean frontmatter, and gives you a file you can upload directly to Claude.ai.

## Features

| Feature | Works without account? |
|---|---|
| 📦 Upload & Convert any `.skill` zip | ✅ Everyone |
| ✨ Enhance description (smart offline) | ✅ Everyone |
| 🔍 Search ClawHub registry | ✅ Everyone (needs proxy below) |
| ⬇️ Download Claude-ready `.skill` | ✅ Everyone |

---

## Cloudflare Worker Setup (one-time, ~5 minutes)

**You do this once. End users never touch it.** The search tab fetches live data from ClawHub through a Cloudflare Worker you deploy. Free forever — 100k requests/day on Cloudflare's free tier.

### Step 1 — Create a Cloudflare account
[cloudflare.com](https://cloudflare.com) → Sign up (no credit card needed).

### Step 2 — Deploy the worker

**Easiest — Cloudflare Dashboard (no CLI):**
1. Log in → **Workers & Pages** → **Create** → **Create Worker**
2. Name it: `clawtoclaude-proxy`
3. Click **Edit code** → delete everything → paste the contents of `worker/worker.js`
4. Click **Deploy**
5. Copy your URL: `https://clawtoclaude-proxy.YOUR-NAME.workers.dev`

**Or with Wrangler CLI:**
```bash
npm install -g wrangler
wrangler login
cd worker/
wrangler deploy
```

### Step 3 — Wire it into the site

In `index.html`, find this line near the top of the `<script>` block:

```js
const PROXY = 'https://clawtoclaude-proxy.ibalajisivarajan.workers.dev';
```

Replace with your URL, push to GitHub. Search now works for everyone. ✅

---

## How conversion works

ClawHub `.skill` zips:
```
spotify-player.zip
├── SKILL.md      ← same format as Claude ✓
├── _meta.json    ← ClawHub registry data (stripped)
└── scripts/      ← kept as-is
```

ClawToClaude:
1. Reads zip in browser (no server, no upload)
2. Parses `SKILL.md` — handles inline JSON, block scalars, all YAML edge cases
3. Strips `metadata: {clawdbot:...}` and `_meta.json`
4. Rebuilds frontmatter from scratch — only `name:` + `description:` (always valid YAML)
5. Enhances description offline — 20+ skill category detection, no API needed
6. Outputs clean `.skill` zip ready for Claude.ai

## Installing in Claude

1. Download your `.skill` file
2. Claude.ai → Settings → Skills → Upload Skill
3. Done — Claude loads it when relevant

---

## Repo structure

```
clawtoclaude/
├── index.html       ← entire tool (single HTML file)
├── README.md
└── worker/
    ├── worker.js    ← Cloudflare Worker (proxy source)
    └── wrangler.toml
```

---

*Built by [@ibalajisivarajan](https://github.com/ibalajisivarajan)*
