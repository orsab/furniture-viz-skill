# Furniture Visualizer Skill

`furniture-visualizer` teaches a tool-enabled AI agent to turn furniture sketches, dimensioned PDFs, photos, and briefs into an editable design spec and an interactive, offline 3D preview. It is a skill for your agent, not a model to download or fine-tune. Use a model that can inspect images when your sources include drawings or photos.

## 1. Download the compiled release

Download [`furniture-visualizer.skill`](https://github.com/orsab/furniture-viz-skill/releases/latest/download/furniture-visualizer.skill) from [GitHub Releases](https://github.com/orsab/furniture-viz-skill/releases/latest). Sign in with a GitHub account that has access to this private repository. Use the `.skill` file under **Assets**, not the source code archive.

You need **Node.js 22.12+** to run the bundled tools. You do not need to clone the repository, install npm dependencies, or compile the release.

## 2. Install it in your AI assistant

The `.skill` file is a ZIP archive. Run one command block below, replacing `~/Downloads/furniture-visualizer.skill` if you saved it elsewhere. Keep the entire `furniture-visualizer/` directory together; `SKILL.md` alone is not enough.

**[Codex](https://developers.openai.com/codex/skills)**

```sh
mkdir -p "$HOME/.agents/skills"
unzip "$HOME/Downloads/furniture-visualizer.skill" -d "$HOME/.agents/skills"
```

Open your furniture project in Codex and select `furniture-visualizer` from `/skills` or mention `$furniture-visualizer` in your prompt.

**[Claude Code](https://code.claude.com/docs/en/skills)**

```sh
mkdir -p "$HOME/.claude/skills"
unzip "$HOME/Downloads/furniture-visualizer.skill" -d "$HOME/.claude/skills"
```

Open your furniture project in Claude Code and invoke `/furniture-visualizer` or name the skill in your prompt.

**Other assistants:** If your host imports custom skill archives, use the downloaded `.skill` file. Otherwise, extract it into that host’s skill directory. If your host has shell and file access but no skill discovery, give it the extracted `furniture-visualizer/SKILL.md` path and ask it to follow that file. A chat with no file or shell access cannot run the local exporter.

If you prefer a graphical archive tool, rename a copy to `.zip`, extract it, and move the resulting `furniture-visualizer/` folder to the appropriate skills directory above. When upgrading, replace the old folder with the new one rather than merging them.

## 3. Give the agent a project

Put your drawings, photos, and brief in a separate project folder and start the agent there. Example prompt:

> Use the `furniture-visualizer` skill to turn `wardrobe.pdf` and `brief.txt` into an interactive preview. Reconcile dimensions and label estimates in `private/draft.json`. Show me any conflicts and wait for my approval before exporting `deliverables/wardrobe.html`.

For the final export, provide a business name and logo when the agent asks. The HTML opens directly in a modern WebGL2 browser; the viewer needs no server or API key. The normal workflow does not require a separate extraction API key. If working with confidential files, check whether your chosen agent sends inputs to a hosted model before granting access.

See [SKILL.md](SKILL.md) for the full review and export workflow.

## Build from source (optional)

With Git, Node.js 22.12+, npm, and `zip` installed:

```sh
git clone https://github.com/orsab/furniture-viz-skill.git
cd furniture-viz-skill
npm ci
npm run pack:skill
```

This produces `dist/furniture-visualizer.skill`. Use it in place of the downloaded archive in step 2.
