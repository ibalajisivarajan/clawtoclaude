# 🦞→🤖 ClawToClaud

> *Hauling ClawHub skills from the deep — surfacing them as Claude-ready `.skill` files*

**Live Tool →** [ibalajisivarajan.github.io/clawtoclaud](https://ibalajisivarajan.github.io/clawtoclaud)

---

```
  /\_/\   /\_/\
 ( o.o ) ( >.< )   🦞  C L A W T O C L A U D  🤖
  > ^ <   > ^ <
 /|   |\ /|   |\    converting the depths to the cloud
(_|   |_(_|   |_)
```

---

## What is this?

[ClawHub](https://clawhub.ai) is the public skill registry for OpenClaw agents — think npm but for AI agent skills. There are 5400+ community-built skills covering everything from GitHub to Stripe to Spotify.

[Claude.ai](https://claude.ai) has its own skill system using the **exact same `SKILL.md` format** — but ClawHub skills carry registry-specific metadata (`clawdbot`, `_meta.json`) that Claude doesn't need, and descriptions optimised for OpenClaw's trigger model, not Claude's.

**ClawToClaud bridges this.** Drop a ClawHub zip, get a Claude-ready `.skill` file. No server. No signup. 100% in your browser.

---

## Features

| | |
|---|---|
| 📦 **Upload & Convert** | Drop a `.skill` zip → strips ClawHub metadata → outputs Claude-ready `.skill` |
| 📡 **Sonar Search** | Search ClawHub directly, fetch and convert in one click |
| ✦ **AI Enhancement** | Claude rewrites the description for better triggering in Claude.ai |
| ⚠ **Compat Checker** | Flags CLI binaries, env vars, shell commands that won't work in Claude.ai chat |
| 🎨 **Live Preview** | See the converted `SKILL.md` update in real time as you edit |

---

## How to use

### Option A — Live tool
👉 **[ibalajisivarajan.github.io/clawtoclaud](https://ibalajisivarajan.github.io/clawtoclaud)**

### Option B — Run locally
```bash
git clone https://github.com/ibalajisivarajan/clawtoclaud
cd clawtoclaud
open index.html
```

Zero dependencies. Zero build step. One HTML file.

---

## How conversion works

A ClawHub `.skill` zip looks like:
```
spotify-player-1_0_0.zip
├── SKILL.md         ← same format as Claude skills ✓
└── _meta.json       ← ClawHub registry data (stripped 🗑)
```

ClawToClaud:
1. **Reads** the zip in your browser using JSZip
2. **Parses** the `SKILL.md` frontmatter
3. **Strips** `metadata: {clawdbot: ...}` (OpenClaw-only block)
4. **Removes** `_meta.json` (ClawHub registry file, not needed)
5. **Optionally rewrites** the `description:` via Claude AI for better triggering
6. **Flags** compat warnings (CLI tools, env vars, bash scripts)
7. **Outputs** a clean `.skill` zip ready for Claude.ai

---

## Installing converted skills in Claude

1. Download your `.skill` file from ClawToClaud
2. Open **Claude.ai → Settings → Skills**
3. Click **Upload Skill**
4. Done — Claude auto-loads it when relevant queries match

---

## Compatibility notes

Some ClawHub skills require:
- **CLI binaries** (e.g. `spogo`, `ffmpeg`, `gh`) — only work in Claude Code with shell access
- **Environment variables** — must be configured before use
- **Shell/bash scripts** — work in Claude Code, limited in Claude.ai browser chat

ClawToClaud flags all of these automatically so you're not surprised.

---

## Stack

- **Pure HTML + Vanilla JS** — zero framework, zero build step
- **[JSZip](https://stuk.github.io/jszip/)** — browser-side zip read/write
- **Claude Sonnet API** (built into claude.ai artifacts) — description enhancement
- **GitHub Pages** — hosting

---

## Roadmap

- [ ] Cloudflare Worker CORS proxy for Search tab
- [ ] Bulk convert (paste list of slugs → zip of `.skill` files)
- [ ] Preview SKILL.md rendered as markdown
- [ ] "Trending on ClawHub" homepage section
- [ ] Dark/bioluminescent theme toggle (it's already bioluminescent, so... 🦞)

---

## Contributing

PRs welcome. Issues welcome. Lobster emoji encouraged.

```bash
git clone https://github.com/ibalajisivarajan/clawtoclaud
# edit index.html
# open in browser
# ship it
```

---

## License

MIT — build on it, fork it, ship it.

---

*Built by [@ibalajisivarajan](https://github.com/ibalajisivarajan) · Part of the [IncomeForge](https://github.com/ibalajisivarajan) project series · Deep sea, high cloud* 🦞☁️
