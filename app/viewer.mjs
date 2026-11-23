import { initialState, validateState } from '../lib/state.mjs';
import { createStudio } from './studio.mjs';
import { mountInspector } from './inspector.mjs';

const { spec, assets, identity } = JSON.parse(document.getElementById('study-data').textContent);
const $ = id => document.getElementById(id);

// Only this constant template is HTML. All project and configuration strings go through textContent/value.
$('app').innerHTML = `<a class="skip" href="#inspector">Skip to customization</a>
<header class="mast"><div class="brand"><svg aria-hidden="true" viewBox="0 0 32 32"><path d="m4 10 12-6 12 6-12 6z M4 16l12 6 12-6 M4 22l12 6 12-6"/></svg><span>Form Study</span></div><span class="mast-note">Furniture configurator</span><div class="actions"><button id="export-png" type="button">Export PNG</button><button id="load" type="button">Load setup</button><button id="save" type="button" class="primary">Save setup <span aria-hidden="true">↓</span></button><input id="file" type="file" accept="application/json,.json" hidden></div></header>
<main><div class="intro"><div><p class="eyebrow"><span class="rule"></span> Object study</p><h1 id="name"></h1><p id="description" class="description"></p></div><span class="edition"><i></i> Offline edition</span></div>
<div class="workbench"><section class="preview" aria-label="Furniture preview"><div class="stage"><div id="canvas-wrap" aria-label="Interactive three-dimensional view"></div><div class="plate-id" aria-hidden="true">FS <span>/</span> MODEL VIEW</div><div id="hover-pill" aria-hidden="true" hidden></div><div id="scene-message" role="status">Preparing the 3D view…</div></div>
<div class="camera-bar" role="toolbar" focusgroup="toolbar wrap" aria-label="Viewport controls" aria-controls="canvas-wrap">
<div class="toolbar-group" role="group" aria-label="Views and lighting">
<label class="camera-select"><span class="sr-only">Camera preset</span><select id="camera"><option value="">Camera views</option><option value="studio">Studio view</option><option value="front">Front</option><option value="side">Side</option><option value="top">Top</option><option value="back">Back</option></select></label>
<label class="camera-select"><span class="sr-only">Studio lighting</span><select id="lighting"><option value="daylight">Daylight</option><option value="gallery">Warm gallery</option><option value="crisp">Crisp neutral</option></select></label>
<button id="projection" type="button" aria-pressed="false" title="Toggle orthographic projection">Orthographic</button>
</div>
<span role="separator" aria-orientation="vertical"></span>
<div class="nudges" role="group" aria-label="Orbit"><span class="camera-label" aria-hidden="true">Orbit</span><button type="button" data-yaw="-15" aria-label="Orbit left" title="Orbit left">←</button><button type="button" data-yaw="15" aria-label="Orbit right" title="Orbit right">→</button><button type="button" data-pitch="10" aria-label="Orbit up" title="Orbit up">↑</button><button type="button" data-pitch="-10" aria-label="Orbit down" title="Orbit down">↓</button></div>
<span role="separator" aria-orientation="vertical"></span>
<div class="nudges" role="group" aria-label="Zoom and viewport tools"><span class="camera-label" aria-hidden="true">Zoom</span><button type="button" data-zoom="0.84" aria-label="Zoom out" title="Zoom out">−</button><button type="button" data-zoom="1.19" aria-label="Zoom in" title="Zoom in">+</button><button id="pins-toggle" type="button" aria-pressed="true" title="Toggle interactive 3D pins">Pins</button><button id="quick-png" type="button" aria-label="Quick export studio PNG" title="Quick export studio PNG">PNG</button></div></div>
<div class="facts"><div><span class="eyebrow">Enclosure · W × D × H</span><strong id="envelope"></strong></div><div><span class="eyebrow">Scale reference</span><strong id="figure-summary"></strong></div></div><details class="notes"><summary>About this study</summary><p>This is a visual model, not a fabrication drawing or an ergonomic assessment. Colors depend on the display and lighting. Click doors, drawers, switches, or parts directly in the 3D scene to interact.</p><p id="estimates"></p></details></section>
<aside id="inspector" tabindex="-1"><p class="eyebrow">Edit the study</p><h2>Configuration</h2><div class="mode" role="group" aria-label="Customization category"><button id="furniture-tab" type="button" aria-pressed="true" aria-controls="furniture">Furniture</button><button id="person-tab" type="button" aria-pressed="false" aria-controls="person">Person</button></div><div id="furniture"></div><div id="person" hidden></div><div class="reset"><button id="reset" type="button" class="text-button">Reset to design defaults</button></div></aside></div>
<div id="notice" role="status" aria-live="polite"></div></main>
<dialog id="export-dialog" aria-labelledby="export-title"><form method="dialog" class="export-form"><div class="export-head"><h2 id="export-title">Export studio PNG</h2><button id="exp-close" type="button" class="icon-close" aria-label="Close export dialog">×</button></div><p class="hint">Render a high-resolution studio image directly from the current view.</p><label class="field"><span class="field-title">Resolution</span><select id="exp-scale"><option value="1">1× Viewport</option><option value="2" selected>2× Studio HD</option><option value="3">3× Print Ultra</option></select></label><p class="export-dims">Output size: <strong id="exp-dims">—</strong></p><label class="field"><span class="field-title">Backdrop</span><select id="exp-bg"><option value="studio">Studio backdrop</option><option value="transparent">Transparent PNG</option></select></label><label class="check-row"><input id="exp-guides" type="checkbox"><span>Include measurement guides</span></label><label class="check-row"><input id="exp-caption" type="checkbox"><span>Include specification strip</span></label><div class="export-actions"><button id="exp-cancel" type="button">Cancel</button><button id="exp-go" type="button" class="primary">Download PNG <span aria-hidden="true">↓</span></button></div></form></dialog>`;

$('name').textContent = spec.name;
document.title = `${spec.name} · Form Study`;
$('description').textContent = spec.description;
const estimates = [...new Set(spec.evidence.filter(e => e.status === 'estimated').map(e => e.field))];
$('estimates').textContent = estimates.length ? `Design estimates: ${estimates.join('; ')}.` : 'No estimates were flagged in the reviewed design.';
if (estimates.length) {
  const badge = document.createElement('span');
  badge.className = 'est-badge';
  badge.textContent = `${estimates.length} ${estimates.length === 1 ? 'estimate' : 'estimates'}`;
  document.querySelector('.notes summary').append(' ', badge);
}

const hasInteractivePins = spec.joints.length > 0 || (spec.switches?.length ?? 0) > 0;
if (!hasInteractivePins) $('pins-toggle').hidden = true;

let state = initialState(spec), scene = null, frame = 0, pendingAnimate = false, inspector = null;
function showNotice(message) { $('notice').textContent = message; }

function paint(mode = 'immediate') {
  const d = state.dimensions, p = state.person;
  $('envelope').textContent = `${d.width} × ${d.depth} × ${d.height} mm`;
  $('figure-summary').textContent = p.visible ? `${p.height} mm · ${p.pose}` : 'Not shown';
  if (mode === 'animate') pendingAnimate = true;
  if (scene && !frame) {
    frame = requestAnimationFrame(() => {
      frame = 0;
      const animate = pendingAnimate;
      pendingAnimate = false;
      try { scene.update(state, { animate }); }
      catch (e) { showNotice(`Preview error: ${e.message}`); }
    });
  }
}

function controls(mode = 'immediate') {
  inspector = mountInspector($('furniture'), $('person'), spec, state, paint);
  paint(mode);
}

for (const key of ['furniture', 'person']) {
  $(`${key}-tab`).addEventListener('click', () => {
    for (const other of ['furniture', 'person']) {
      $(other).hidden = other !== key;
      $(`${other}-tab`).setAttribute('aria-pressed', String(other === key));
    }
  });
}

$('reset').addEventListener('click', () => {
  state = initialState(spec);
  controls('animate');
  scene?.view('studio');
  showNotice('Design defaults restored.');
});

const isBarDisabled = el => el.getAttribute('aria-disabled') === 'true';

$('camera').addEventListener('change', e => {
  if (isBarDisabled(e.target)) { e.target.value = ''; return; }
  if (e.target.value) scene?.view(e.target.value);
  e.target.value = '';
});

$('lighting').addEventListener('change', e => {
  if (isBarDisabled(e.target)) return;
  scene?.setLighting(e.target.value);
  showNotice(`Studio lighting: ${e.target.selectedOptions[0].textContent}.`);
});

$('projection').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (isBarDisabled(btn)) return;
  const nextOrtho = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(nextOrtho));
  scene?.setProjection(nextOrtho ? 'orthographic' : 'perspective');
  showNotice(nextOrtho ? 'Orthographic projection enabled.' : 'Perspective projection enabled.');
});

$('pins-toggle').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (isBarDisabled(btn)) return;
  const nextOn = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(nextOn));
  scene?.setHotspots(nextOn);
});

for (const btn of document.querySelectorAll('[data-zoom],[data-yaw],[data-pitch]')) {
  btn.addEventListener('click', () => {
    if (isBarDisabled(btn)) return;
    const d = btn.dataset;
    if (d.zoom) scene?.zoom(Number(d.zoom));
    else scene?.turn(Number(d.yaw ?? 0), Number(d.pitch ?? 0));
  });
}

function buildCaption() {
  const d = state.dimensions;
  const finishSummary = spec.slots.map(s => {
    const f = state.finishes[s.id];
    const preset = s.finishes[f.index];
    return `${s.label}: ${f.tint ? `${preset.name} (${f.tint.toUpperCase()})` : preset.name}`;
  }).join('  ·  ');
  return {
    name: spec.name,
    dimensions: `${d.width.toLocaleString('en-US')} × ${d.depth.toLocaleString('en-US')} × ${d.height.toLocaleString('en-US')} mm`,
    finishes: finishSummary || spec.description
  };
}

async function runPngExport(options) {
  if (!scene) return;
  const d = state.dimensions;
  const slug = spec.name.replace(/[^a-z\d]+/gi, '-').replace(/^-|-$/g, '').slice(0, 64) || 'furniture';
  const { blob, width, height } = await scene.exportPng({
    ...options,
    caption: options.includeCaption ? buildCaption() : null
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slug}-${d.width}x${d.depth}x${d.height}.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showNotice(`Exported ${width} × ${height} PNG.`);
}

const exportDialog = $('export-dialog');
function updateExportDims() {
  const wrap = $('canvas-wrap');
  const scale = Number($('exp-scale').value) || 2;
  const w = Math.round(wrap.clientWidth * scale);
  const h = Math.round(wrap.clientHeight * scale) + ($('exp-caption').checked ? Math.round(74 * scale) : 0);
  $('exp-dims').textContent = w && h ? `${w.toLocaleString('en-US')} × ${h.toLocaleString('en-US')} px` : '—';
}

$('export-png').addEventListener('click', () => {
  if (!scene) { showNotice('Wait for the 3D view to finish loading.'); return; }
  $('exp-guides').checked = state.showDimensions;
  updateExportDims();
  exportDialog.showModal();
});
$('exp-scale').addEventListener('change', updateExportDims);
$('exp-caption').addEventListener('change', updateExportDims);
$('exp-cancel').addEventListener('click', () => exportDialog.close());
$('exp-close').addEventListener('click', () => exportDialog.close());
$('exp-go').addEventListener('click', async () => {
  const btn = $('exp-go');
  btn.disabled = true;
  try {
    await runPngExport({
      scale: Number($('exp-scale').value) || 2,
      transparent: $('exp-bg').value === 'transparent',
      includeGuides: $('exp-guides').checked,
      includeCaption: $('exp-caption').checked
    });
    exportDialog.close();
  } catch (err) {
    showNotice(`PNG export failed: ${err.message}`);
  } finally {
    btn.disabled = false;
  }
});

$('quick-png').addEventListener('click', async e => {
  if (isBarDisabled(e.currentTarget)) return;
  try {
    await runPngExport({
      scale: 2,
      transparent: false,
      includeGuides: state.showDimensions,
      includeCaption: false
    });
  } catch (err) {
    showNotice(`PNG export failed: ${err.message}`);
  }
});

$('save').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ format: 'form-study/setup@1', model: identity, state }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url;
  a.download = `${spec.name.replace(/[^a-z\d]+/gi, '-').slice(0, 64) || 'furniture'}-setup.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showNotice('Setup downloaded. Load it into this model to restore it.');
});
$('load').addEventListener('click', () => $('file').click());
$('file').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    if (file.size > 262144) throw new Error('Setup exceeds 256 KiB.');
    const saved = JSON.parse(await file.text());
    if (saved?.format !== 'form-study/setup@1' || saved.model !== identity) throw new Error('This is not a setup saved from this model.');
    const next = validateState(spec, saved.state);
    state = next;
    controls();
    showNotice('Saved setup restored.');
  } catch (err) { showNotice(`Setup not loaded: ${err.message}`); }
});

// Toolbar roving-tabindex fallback only when native focusgroup is unavailable.
if (!('focusGroup' in HTMLElement.prototype)) {
  const bar = document.querySelector('.camera-bar');
  const items = [...bar.querySelectorAll('button, select')].filter(el => !el.hidden);
  items.forEach((el, i) => { el.tabIndex = i ? -1 : 0; });
  bar.addEventListener('focusin', ({ target }) => {
    if (items.includes(target)) items.forEach(el => { el.tabIndex = el === target ? 0 : -1; });
  });
  bar.addEventListener('keydown', e => {
    const cur = items.indexOf(document.activeElement);
    if (cur < 0) return;
    const rtl = getComputedStyle(bar).direction === 'rtl';
    let next = -1;
    if (e.key === 'ArrowRight') next = (cur + (rtl ? -1 : 1) + items.length) % items.length;
    else if (e.key === 'ArrowLeft') next = (cur + (rtl ? 1 : -1) + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next >= 0) { e.preventDefault(); items[next].focus(); }
  });
}

function describeAction(action) {
  if (!action) return '';
  if (action.type === 'switch') return `${action.label} · Click to turn ${state.switches[action.id] ? 'off' : 'on'}`;
  if (action.type === 'joint') return `${action.label} · Click to ${state.joints[action.id] > 0.02 ? 'close' : 'open'}`;
  if (action.type === 'option') return `${action.label} · Click to cycle`;
  if (action.type === 'person') return `Reference person · Click to ${state.person.pose === 'standing' ? 'sit' : 'stand'}`;
  if (action.type === 'slot') return `${action.label} · Click to edit finish`;
  return action.label;
}

function handle3DInteract(action) {
  if (!action) return;
  if (action.type === 'switch') {
    const next = !state.switches[action.id];
    state.switches[action.id] = next;
    inspector?.sync();
    paint('animate');
    showNotice(`${action.label} turned ${next ? 'on' : 'off'}.`);
  } else if (action.type === 'joint') {
    const next = state.joints[action.id] > 0.02 ? 0 : 1;
    state.joints[action.id] = next;
    inspector?.sync();
    paint('animate');
    showNotice(`${action.label} ${next ? 'opened' : 'closed'}.`);
  } else if (action.type === 'option') {
    const opt = spec.options.find(o => o.id === action.id);
    if (!opt) return;
    const idx = opt.choices.indexOf(state.options[opt.id]);
    const next = opt.choices[(idx + 1) % opt.choices.length];
    state.options[opt.id] = next;
    inspector?.sync();
    paint('immediate');
    showNotice(`${opt.label}: ${next}.`);
  } else if (action.type === 'person') {
    const next = state.person.pose === 'standing' ? 'seated' : 'standing';
    state.person.pose = next;
    inspector?.sync();
    paint('immediate');
    showNotice(`Reference person pose: ${next}.`);
  } else if (action.type === 'slot') {
    inspector?.focusSlot(action.id);
    showNotice(`Editing finish: ${action.label}.`);
  }
}

controls();
const cameras = [...document.querySelectorAll('.camera-bar button,.camera-bar select')];
for (const c of cameras) c.setAttribute('aria-disabled', 'true');
$('export-png').disabled = true;

createStudio($('canvas-wrap'), spec, assets, {
  onHover(action) {
    const pill = $('hover-pill');
    if (!action) { pill.hidden = true; return; }
    pill.textContent = describeAction(action);
    pill.hidden = false;
  },
  onInteract(action) {
    handle3DInteract(action);
    const pill = $('hover-pill');
    if (!pill.hidden && action) pill.textContent = describeAction(action);
  }
}).then(s => {
  scene = s;
  s.update(state, { animate: false });
  s.view('studio');
  $('scene-message').hidden = true;
  for (const c of cameras) c.removeAttribute('aria-disabled');
  $('export-png').disabled = false;
}).catch(e => {
  $('scene-message').textContent = `3D preview unavailable. Use a WebGL 2 capable browser with graphics acceleration. ${e.message}`;
});
