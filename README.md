# Furniture Visualizer Skill

`furniture-visualizer` teaches a tool-enabled AI agent to turn furniture sketches, dimensioned PDFs, photos, and briefs into an editable design spec and an interactive, offline 3D preview. It is a skill for your agent, not a model to download or fine-tune. Use a model that can inspect images when your sources include drawings or photos.

## 1. Build the skill package

You need Git, Node.js **22.12+**, npm, and the `zip` command. This repository is private; authenticate to GitHub with an account that has access before cloning.

```sh
git clone https://github.com/orsab/furniture-viz-skill.git
cd furniture-viz-skill
npm ci
npm run pack:skill
```

This creates `dist/furniture-visualizer/` and `dist/furniture-visualizer.skill` (a ZIP-format archive). If you already received a built package, skip this step. The packaged tools do not need `npm install`.

## 2. Install it in your AI assistant

Run **one** of these from the repository root. Copy the entire directory, not just `SKILL.md`; the skill needs its bundled tools, assets, and references.

**[Codex](https://developers.openai.com/codex/skills)**

```sh
mkdir -p "$HOME/.agents/skills"
cp -R dist/furniture-visualizer "$HOME/.agents/skills/"
```

Open your furniture project in Codex and select `furniture-visualizer` from `/skills` or mention `$furniture-visualizer` in your prompt.

**[Claude Code](https://code.claude.com/docs/en/skills)**

```sh
mkdir -p "$HOME/.claude/skills"
cp -R dist/furniture-visualizer "$HOME/.claude/skills/"
```

Open your furniture project in Claude Code and invoke `/furniture-visualizer` or name the skill in your prompt.

**Other assistants:** If your host can import custom skills, follow its instructions to import the packaged directory or archive. If it has shell and file access but no skill discovery, give it the installed `SKILL.md` path and ask it to follow that file. A chat with no file or shell access cannot run the local exporter.

## 3. Give the agent a project

Put your drawings, photos, and brief in a separate project folder and start the agent there. Example prompt:

> Use the `furniture-visualizer` skill to turn `wardrobe.pdf` and `brief.txt` into an interactive preview. Reconcile dimensions and label estimates in `private/draft.json`. Show me any conflicts and wait for my approval before exporting `deliverables/wardrobe.html`.

For the final export, provide a business name and logo when the agent asks. The HTML opens directly in a modern WebGL2 browser; the viewer needs no server or API key. The normal workflow does not require a separate extraction API key. If working with confidential files, check whether your chosen agent sends inputs to a hosted model before granting access.

See [SKILL.md](SKILL.md) for the full review and export workflow.
