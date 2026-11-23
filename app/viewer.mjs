import { initialState, validateState } from '../lib/state.mjs';
import { createStudio } from './studio.mjs';
import { mountInspector } from './inspector.mjs';
import { createTranslator } from './i18n.mjs';
import { ROOM_WALL_PRESETS, ROOM_FLOOR_PRESETS } from './presets.mjs';
import { buildSpecSheetModel, renderSpecSheetDOM, composeSpecSheetPng } from './spec-sheet.mjs';
import { REACH_ZONE_COLORS } from './person-ai.mjs';

const { spec, assets, identity, brand = null, presentation = null } = JSON.parse(document.getElementById('study-data').textContent);
const $ = id => document.getElementById(id);

let lang = 'he';
let tr = createTranslator(lang);
document.documentElement.lang = tr.lang;
document.documentElement.dir = tr.dir;

const makeStudioLocale = tObj => ({
  lang: tObj.lang,
  dir: tObj.dir,
  axes: tObj.axes,
  mmUnit: tObj.mmUnit,
  term: tObj.term,
  formatCanvasLabel: name => tObj.t('canvasAriaLabel', { name }),
  formatHotspot: (kind, label, val) => {
    if (kind === 'joint') {
      return val > 0.02
        ? tObj.t('hotspotOpen', { label, pct: Math.round(val * 100) })
        : tObj.t('hotspotClosed', { label });
    }
    return val >= 0.5
      ? tObj.t('hotspotOn', { label })
      : tObj.t('hotspotOff', { label });
  }
});

// Only this constant template is HTML. All project and configuration strings go through textContent/value.
$('app').innerHTML = `<a id="skip-link" class="skip" href="#inspector"></a>
<header class="mast"><div class="brand"><img id="brand-logo" class="brand-logo" alt="" hidden><svg id="brand-mark-fallback" aria-hidden="true" viewBox="0 0 32 32"><path d="m4 10 12-6 12 6-12 6z M4 16l12 6 12-6 M4 22l12 6 12-6"/></svg><span id="brand-name"></span></div><span id="brand-sub" class="mast-note"></span><div class="actions"><div class="lang-switch" role="group" id="lang-group"><button id="lang-he" type="button" lang="he" aria-pressed="true">עברית</button><button id="lang-en" type="button" lang="en" aria-pressed="false">EN</button></div><button id="spec-sheet" type="button"></button><button id="export-png" type="button"></button><button id="load" type="button"></button><button id="save" type="button" class="primary"><span id="save-label"></span> <span aria-hidden="true">↓</span></button><input id="file" type="file" accept="application/json,.json" hidden></div></header>
<main><div class="intro"><div><p class="eyebrow"><span class="rule"></span><span id="eyebrow-study"></span></p><h1 id="name"></h1><p id="description" class="description"></p></div><span class="edition"><i></i><span id="edition-text"></span></span></div>
<div class="workbench"><section class="preview" aria-label="Furniture preview"><div class="stage"><div id="canvas-wrap"></div><div id="plate-id" class="plate-id" aria-hidden="true"></div><div id="hover-pill" aria-hidden="true" hidden><span class="hover-head"><span class="hover-swatch" aria-hidden="true"></span><strong class="hover-title"></strong><span class="hover-finish"></span></span><span class="hover-action"></span></div><div id="stage-context-menu" class="context-menu" role="menu" hidden></div><div id="scene-message" role="status"></div></div>
<div class="camera-bar" role="toolbar" focusgroup="toolbar wrap" aria-controls="canvas-wrap">
<div id="group-views" class="toolbar-group" role="group">
<label class="camera-select"><span id="lbl-cam" class="sr-only"></span><select id="camera"><option value=""></option><option value="studio"></option><option value="front"></option><option value="side"></option><option value="top"></option><option value="back"></option></select></label>
<label class="camera-select"><span id="lbl-light" class="sr-only"></span><select id="lighting"><option value="daylight"></option><option value="gallery"></option><option value="crisp"></option><option value="evening"></option></select></label>
<label class="camera-select"><span id="lbl-backdrop" class="sr-only"></span><select id="backdrop"><option value="studio"></option><option value="room"></option></select></label>
<button id="projection" type="button" aria-pressed="false"></button>
<button id="xray-toggle" type="button" aria-pressed="false"></button>
<button id="access-toggle" type="button" aria-pressed="false"></button>
<button id="ao-toggle" type="button" aria-pressed="true"></button>
</div>
<span role="separator" aria-orientation="vertical"></span>
<div id="group-orbit" class="nudges" dir="ltr" role="group"><span id="lbl-orbit" class="camera-label" aria-hidden="true"></span><button type="button" data-yaw="-15">←</button><button type="button" data-yaw="15">→</button><button type="button" data-pitch="10">↑</button><button type="button" data-pitch="-10">↓</button></div>
<span role="separator" aria-orientation="vertical"></span>
<div id="group-zoom" class="nudges" dir="ltr" role="group"><span id="lbl-zoom" class="camera-label" aria-hidden="true"></span><button type="button" data-zoom="0.84">−</button><button type="button" data-zoom="1.19">+</button><button id="pins-toggle" type="button" aria-pressed="false"></button><button id="person-run" type="button" aria-pressed="false"></button><button id="quick-png" type="button"></button></div></div>
<div id="room-bar" class="room-bar" role="group" hidden><span id="lbl-room-wall" class="room-label"></span><div id="room-wall-swatches" class="room-swatches" role="group"></div><input id="room-wall-color" class="room-color-input" type="color"><label class="room-floor-wrap"><span id="lbl-room-floor" class="room-label"></span><select id="room-floor"></select></label></div>
<div class="facts"><div><span id="lbl-enclosure" class="eyebrow"></span><strong id="envelope"></strong></div><div><span id="lbl-scale-ref" class="eyebrow"></span><strong id="figure-summary"></strong></div></div><details class="notes"><summary id="notes-summary"><span id="about-title"></span></summary><p id="brand-about" class="brand-about" hidden></p><p id="about-body"></p><p id="estimates"></p></details></section>
<aside id="inspector" tabindex="-1"><p id="eyebrow-edit" class="eyebrow"></p><h2 id="heading-config"></h2><div id="mode-group" class="mode" role="group"><button id="furniture-tab" type="button" aria-pressed="true" aria-controls="furniture"></button><button id="person-tab" type="button" aria-pressed="false" aria-controls="person"></button></div><div id="furniture"></div><div id="person" hidden></div><div class="reset"><button id="reset" type="button" class="text-button"></button></div></aside></div>
<div id="notice" role="status" aria-live="polite"></div></main>
<dialog id="export-dialog" aria-labelledby="export-title"><form method="dialog" class="export-form"><div class="export-head"><h2 id="export-title"></h2><button id="exp-close" type="button" class="icon-close">×</button></div><p id="export-hint" class="hint"></p><label class="field"><span id="lbl-exp-res" class="field-title"></span><select id="exp-scale"><option value="1"></option><option value="2" selected></option><option value="3"></option></select></label><p class="export-dims"><span id="lbl-exp-dims"></span><strong id="exp-dims">—</strong></p><label class="field"><span id="lbl-exp-bg" class="field-title"></span><select id="exp-bg"><option value="studio"></option><option value="transparent"></option></select></label><label class="check-row"><input id="exp-guides" type="checkbox"><span id="lbl-exp-guides"></span></label><label class="check-row"><input id="exp-caption" type="checkbox"><span id="lbl-exp-caption"></span></label><div class="export-actions"><button id="exp-cancel" type="button"></button><button id="exp-go" type="button" class="primary"><span id="exp-go-label"></span> <span aria-hidden="true">↓</span></button></div></form></dialog>
<dialog id="sheet-dialog" aria-labelledby="sheet-title"><div class="sheet-shell"><div class="export-head"><h2 id="sheet-title"></h2><button id="sheet-close" type="button" class="icon-close">×</button></div><p id="sheet-hint" class="hint"></p><div id="sheet-preview-body" class="sheet-preview-body"></div><div class="export-actions"><button id="sheet-cancel" type="button"></button><button id="sheet-print" type="button"></button><button id="sheet-png" type="button" class="primary"><span id="sheet-png-label"></span> <span aria-hidden="true">↓</span></button></div></div></dialog>`;

let printSheetHost = $('print-sheet');
if (!printSheetHost) {
  printSheetHost = document.createElement('div');
  printSheetHost.id = 'print-sheet';
  document.body.append(printSheetHost);
}

const estimatesList = [...new Set(spec.evidence.filter(e => e.status === 'estimated').map(e => e.field))];
const initialSlotCounts = Object.fromEntries(spec.slots.map(s => [s.id, s.finishes.length]));
const hasInteractivePins = spec.joints.length > 0 || (spec.switches?.length ?? 0) > 0;
if (!hasInteractivePins) $('pins-toggle').hidden = true;
const hasXrayFronts = spec.joints.some(j => j.type === 'hinge' || j.type === 'flap');
if (!hasXrayFronts) $('xray-toggle').hidden = true;
if (brand?.logo) {
  const logoEl = $('brand-logo');
  logoEl.src = brand.logo;
  logoEl.hidden = false;
  $('brand-mark-fallback').hidden = true;
}

function defaultState() {
  const next = initialState(spec);
  if (presentation) {
    Object.assign(next.joints, presentation.joints);
    Object.assign(next.options, presentation.options);
    next.person.visible = presentation.personVisible;
    next.showDimensions = presentation.showDimensions;
  }
  return next;
}

let state = defaultState(), scene = null, frame = 0, pendingAnimate = false, inspector = null;
let sceneReady = false, sceneErrorMsg = null, lastHoverInfo = null;
let ledTempId = '3500';
let backdropMode = presentation?.backdrop ?? 'studio';
const defaultWallColor = presentation?.wallColor ?? ROOM_WALL_PRESETS[0].hex;
let roomWallColor = defaultWallColor;
let roomFloorKind = presentation?.floor ?? ROOM_FLOOR_PRESETS[0].id;
let xrayEnabled = false;
let accessEnabled = false;
let aoEnabled = true;
let personAutoRunning = false;
let personAutoStatus = null;
let currentSheetModel = null;
let currentSheetViews = null;

for (const preset of ROOM_WALL_PRESETS) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'room-swatch';
  btn.dataset.wallHex = preset.hex;
  btn.dataset.wallKey = preset.key;
  btn.style.backgroundColor = preset.hex;
  btn.setAttribute('aria-pressed', String(preset.hex === roomWallColor));
  $('room-wall-swatches').append(btn);
}
$('room-wall-color').value = roomWallColor;
for (const preset of ROOM_FLOOR_PRESETS) {
  const opt = document.createElement('option');
  opt.value = preset.id;
  opt.dataset.floorKey = preset.key;
  $('room-floor').add(opt);
}
$('room-floor').value = roomFloorKind;
function showNotice(message) { $('notice').textContent = message; }

function updateEstimatesDisplay() {
  const translated = estimatesList.map(f => tr.term(f));
  $('estimates').textContent = translated.length
    ? tr.t('estimatesPrefix', { items: translated.join(', ') })
    : tr.t('noEstimates');
  const sum = $('notes-summary');
  const existing = sum.querySelector('.est-badge');
  if (existing) existing.remove();
  if (estimatesList.length) {
    const badge = document.createElement('span');
    badge.className = 'est-badge';
    badge.textContent = estimatesList.length === 1
      ? tr.t('estimateSingular')
      : tr.t('estimatePlural', { count: estimatesList.length });
    sum.append(' ', badge);
  }
}

const charLabelKey = c => (c === 'female' ? 'charFemale' : c === 'child' ? 'charChild' : 'charMale');

function updateFacts() {
  const d = state.dimensions, p = state.person;
  $('envelope').textContent = `${d.width} × ${d.depth} × ${d.height} ${tr.mmUnit}`;
  $('figure-summary').textContent = p.visible
    ? `${tr.t(charLabelKey(p.character))} · ${p.height} ${tr.mmUnit} · ${tr.t(p.pose === 'seated' ? 'poseSeated' : 'poseStanding')}`
    : tr.t('notShown');
}

function paint(mode = 'immediate') {
  updateFacts();
  if (mode === 'animate') pendingAnimate = true;
  if (scene && !frame) {
    frame = requestAnimationFrame(() => {
      frame = 0;
      const animate = pendingAnimate;
      pendingAnimate = false;
      try { scene.update(state, { animate }); }
      catch (e) { showNotice(tr.t('noticePreviewError', { message: e.message })); }
    });
  }
}

const lightingCtrl = {
  getLedTemp: () => ledTempId,
  onLedTemp: id => {
    ledTempId = id;
    scene?.setLedTemp(id);
    inspector?.sync();
    showNotice(tr.t('noticeLedTemp', { kelvin: id }));
  },
  onMaterialNotice: (name, slotLabel) => {
    showNotice(tr.t('matAppliedNotice', { name, slot: slotLabel }));
  }
};

function formatPersonAutoStatus() {
  if (!personAutoRunning) return tr.t('personAutoIdle');
  if (!personAutoStatus) return tr.t('personAutoStarting');
  if (personAutoStatus.key === 'waiting') return tr.t('personAutoWaiting', { sec: personAutoStatus.sec });
  if (personAutoStatus.key) return tr.t(personAutoStatus.key, { label: tr.term(personAutoStatus.label || '') });
  return tr.t('personAutoStarting');
}

function syncPersonAutoToolbar() {
  const btn = $('person-run');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(personAutoRunning));
  btn.textContent = personAutoRunning ? tr.t('personStop') : tr.t('personRun');
  const title = personAutoRunning ? tr.t('personStopTitle') : tr.t('personRunTitle');
  btn.title = title;
  btn.setAttribute('aria-label', title);
}

function ensurePersonVisible() {
  if (state.person.visible) return;
  state.person.visible = true;
  inspector?.sync();
  updateFacts();
  scene?.update(state, { animate: false });
}

function startPersonAuto() {
  if (!scene) { showNotice(tr.t('noticeWait3d')); return; }
  ensurePersonVisible();
  personAutoRunning = true;
  personAutoStatus = null;
  scene.setPersonAutoRun(true);
  syncPersonAutoToolbar();
  inspector?.sync();
  showNotice(tr.t('noticePersonRunStart'));
}

function stopPersonAuto({ resetPos = false, quiet = false } = {}) {
  const wasRunning = personAutoRunning;
  personAutoRunning = false;
  personAutoStatus = null;
  if (resetPos) scene?.resetPersonPosition?.();
  else scene?.setPersonAutoRun?.(false);
  syncPersonAutoToolbar();
  inspector?.sync();
  if (!quiet && wasRunning) showNotice(tr.t('noticePersonRunStop'));
}

function toggleAccessibility(nextVal) {
  accessEnabled = typeof nextVal === 'boolean' ? nextVal : !accessEnabled;
  const btn = $('access-toggle');
  if (btn) btn.setAttribute('aria-pressed', String(accessEnabled));
  scene?.setAccessibility(accessEnabled);
  inspector?.sync();
  showNotice(tr.t(accessEnabled ? 'noticeAccessOn' : 'noticeAccessOff', { height: state.person.height }));
}

const personCtrl = {
  isRunning: () => personAutoRunning,
  getStatusText: () => formatPersonAutoStatus(),
  onRun: startPersonAuto,
  onStop: () => stopPersonAuto(),
  isAccessEnabled: () => accessEnabled,
  onToggleAccess: val => toggleAccessibility(val)
};

function controls(mode = 'immediate', preserved = null) {
  inspector = mountInspector($('furniture'), $('person'), spec, state, paint, tr, preserved, lightingCtrl, personCtrl);
  paint(mode);
}

function applyStaticStrings() {
  document.documentElement.lang = tr.lang;
  document.documentElement.dir = tr.dir;
  const modelName = tr.term(spec.name);
  const businessName = brand?.businessName || tr.t('brandName');
  document.title = `${modelName} · ${brand?.businessName || tr.t('docTitleSuffix')}`;

  $('skip-link').textContent = tr.t('skip');
  $('brand-name').textContent = businessName;
  $('brand-sub').textContent = brand?.description || tr.t('brandSubtitle');
  $('lang-group').setAttribute('aria-label', tr.t('langGroupLabel'));
  $('lang-he').setAttribute('aria-pressed', String(lang === 'he'));
  $('lang-en').setAttribute('aria-pressed', String(lang === 'en'));

  $('spec-sheet').textContent = tr.t('specSheetBtn');
  $('stage-context-menu').setAttribute('aria-label', tr.t('ctxMenuLabel'));
  closeContextMenu?.();
  $('export-png').textContent = tr.t('exportPng');
  $('load').textContent = tr.t('loadSetup');
  $('save-label').textContent = tr.t('saveSetup');

  $('eyebrow-study').textContent = tr.t('objectStudy');
  $('name').textContent = modelName;
  $('description').textContent = tr.term(spec.description);
  $('edition-text').textContent = tr.t('offlineEdition');
  $('plate-id').textContent = brand?.businessName ? `${brand.businessName} / ${tr.t('modelViewShort')}` : tr.t('modelViewPlate');
  const brandAbout = $('brand-about');
  if (brand?.description) {
    brandAbout.textContent = `${brand.businessName} — ${brand.description}`;
    brandAbout.hidden = false;
  } else {
    brandAbout.hidden = true;
  }
  $('canvas-wrap').setAttribute('aria-label', tr.t('canvasAriaLabel', { name: modelName }));

  if (!sceneReady) {
    $('scene-message').textContent = sceneErrorMsg
      ? tr.t('webglUnavailable', { message: sceneErrorMsg })
      : tr.t('preparing3d');
  }

  const bar = document.querySelector('.camera-bar');
  bar.setAttribute('aria-label', tr.t('viewportControls'));
  $('group-views').setAttribute('aria-label', tr.t('viewsAndLighting'));
  $('group-orbit').setAttribute('aria-label', tr.t('orbit'));
  $('group-zoom').setAttribute('aria-label', tr.t('zoom'));

  $('lbl-cam').textContent = tr.t('cameraPreset');
  const camSel = $('camera');
  const camLabels = [tr.t('cameraViews'), tr.t('viewStudio'), tr.t('viewFront'), tr.t('viewSide'), tr.t('viewTop'), tr.t('viewBack')];
  [...camSel.options].forEach((opt, i) => { opt.textContent = camLabels[i]; });

  $('lbl-light').textContent = tr.t('studioLighting');
  const lightSel = $('lighting');
  const lightLabels = [tr.t('lightDaylight'), tr.t('lightGallery'), tr.t('lightCrisp'), tr.t('lightEvening')];
  [...lightSel.options].forEach((opt, i) => { opt.textContent = lightLabels[i]; });

  $('lbl-backdrop').textContent = tr.t('backdropMode');
  const bgSel = $('backdrop');
  const bgBarLabels = [tr.t('backdropStudio'), tr.t('backdropRoom')];
  [...bgSel.options].forEach((opt, i) => { opt.textContent = bgBarLabels[i]; });

  $('projection').textContent = tr.t('orthographic');
  $('projection').title = tr.t('orthographicTitle');
  $('xray-toggle').textContent = tr.t('xrayToggle');
  $('xray-toggle').title = tr.t('xrayTitle');
  $('access-toggle').textContent = tr.t('accessToggle');
  $('access-toggle').title = tr.t('accessTitle');
  $('ao-toggle').textContent = tr.t('aoToggle');
  $('ao-toggle').title = tr.t('aoTitle');

  $('room-bar').setAttribute('aria-label', tr.t('roomSettings'));
  $('lbl-room-wall').textContent = tr.t('roomWall');
  $('lbl-room-floor').textContent = tr.t('roomFloor');
  $('room-wall-color').setAttribute('aria-label', tr.t('roomWallCustom'));
  $('room-wall-color').title = tr.t('roomWallCustom');
  for (const swBtn of $('room-wall-swatches').querySelectorAll('.room-swatch')) {
    const label = tr.t(swBtn.dataset.wallKey);
    swBtn.setAttribute('aria-label', label);
    swBtn.title = label;
  }
  for (const opt of $('room-floor').options) {
    opt.textContent = tr.t(opt.dataset.floorKey);
  }
  $('lbl-orbit').textContent = tr.t('orbit');
  $('lbl-zoom').textContent = tr.t('zoom');

  const dirLabels = {
    'yaw:-15': tr.t('orbitLeft'),
    'yaw:15': tr.t('orbitRight'),
    'pitch:10': tr.t('orbitUp'),
    'pitch:-10': tr.t('orbitDown'),
    'zoom:0.84': tr.t('zoomOut'),
    'zoom:1.19': tr.t('zoomIn')
  };
  for (const btn of bar.querySelectorAll('[data-yaw],[data-pitch],[data-zoom]')) {
    const key = btn.dataset.yaw ? `yaw:${btn.dataset.yaw}` : btn.dataset.pitch ? `pitch:${btn.dataset.pitch}` : `zoom:${btn.dataset.zoom}`;
    btn.setAttribute('aria-label', dirLabels[key]);
    btn.title = dirLabels[key];
  }

  $('pins-toggle').textContent = tr.t('pins');
  $('pins-toggle').title = tr.t('pinsTitle');
  syncPersonAutoToolbar();
  $('quick-png').textContent = tr.t('quickPng');
  $('quick-png').setAttribute('aria-label', tr.t('quickPngTitle'));
  $('quick-png').title = tr.t('quickPngTitle');

  $('lbl-enclosure').textContent = tr.t('enclosureLabel');
  $('lbl-scale-ref').textContent = tr.t('scaleReference');
  $('about-title').textContent = tr.t('aboutStudy');
  $('about-body').textContent = tr.t('aboutBody');
  updateEstimatesDisplay();

  $('eyebrow-edit').textContent = tr.t('editStudy');
  $('heading-config').textContent = tr.t('configuration');
  $('mode-group').setAttribute('aria-label', tr.t('categoryGroup'));
  $('furniture-tab').textContent = tr.t('tabFurniture');
  $('person-tab').textContent = tr.t('tabPerson');
  $('reset').textContent = tr.t('resetDefaults');

  $('export-title').textContent = tr.t('exportTitle');
  $('exp-close').setAttribute('aria-label', tr.t('closeDialog'));
  $('export-hint').textContent = tr.t('exportHint');
  $('lbl-exp-res').textContent = tr.t('resolution');
  const scaleOpts = [tr.t('scale1'), tr.t('scale2'), tr.t('scale3')];
  [...$('exp-scale').options].forEach((o, i) => { o.textContent = scaleOpts[i]; });
  $('lbl-exp-dims').textContent = tr.t('outputSize');
  $('lbl-exp-bg').textContent = tr.t('backdrop');
  const bgOpts = [tr.t('bgStudio'), tr.t('bgTransparent')];
  [...$('exp-bg').options].forEach((o, i) => { o.textContent = bgOpts[i]; });
  $('lbl-exp-guides').textContent = tr.t('includeGuides');
  $('lbl-exp-caption').textContent = tr.t('includeCaption');
  $('exp-cancel').textContent = tr.t('cancel');
  $('exp-go-label').textContent = tr.t('downloadPng');

  $('sheet-title').textContent = tr.t('specSheetTitle');
  $('sheet-close').setAttribute('aria-label', tr.t('specSheetClose'));
  $('sheet-hint').textContent = tr.t('specSheetHint');
  $('sheet-cancel').textContent = tr.t('cancel');
  $('sheet-print').textContent = tr.t('specSheetPrint');
  $('sheet-png-label').textContent = tr.t('specSheetPng');

  if (sheetDialog?.open && currentSheetViews) {
    currentSheetModel = buildSpecSheetModel({ spec, state, brand, tr, ledTempId, backdropMode });
    renderSpecSheetDOM($('sheet-preview-body'), currentSheetModel, currentSheetViews, tr);
    renderSpecSheetDOM(printSheetHost, currentSheetModel, currentSheetViews, tr);
  }
}

function applyLanguage(nextLang, { announce = false } = {}) {
  if (nextLang !== 'he' && nextLang !== 'en') return;
  const openSections = new Set(
    [...$('inspector').querySelectorAll('details.section[open]')].map(d => d.dataset.section)
  );
  const selectedSlot = inspector?.getSelectedSlot?.() ?? null;
  lang = nextLang;
  tr = createTranslator(lang);
  applyStaticStrings();
  controls('immediate', { openSections, selectedSlot });
  scene?.setLocale(makeStudioLocale(tr));
  if (lastHoverInfo) renderHoverPill(lastHoverInfo);
  if (exportDialog.open) updateExportDims();
  if (announce) showNotice(tr.t('noticeLangSwitched'));
}

$('lang-he').addEventListener('click', () => { if (lang !== 'he') applyLanguage('he', { announce: true }); });
$('lang-en').addEventListener('click', () => { if (lang !== 'en') applyLanguage('en', { announce: true }); });

function selectInspector(key) {
  for (const other of ['furniture', 'person']) {
    $(other).hidden = other !== key;
    $(`${other}-tab`).setAttribute('aria-pressed', String(other === key));
  }
}
for (const key of ['furniture', 'person']) {
  $(`${key}-tab`).addEventListener('click', () => selectInspector(key));
}

function applyPresentation() {
  $('lighting').value = presentation.lighting;
  backdropMode = $('backdrop').value = presentation.backdrop;
  $('room-bar').hidden = backdropMode !== 'room';
  roomWallColor = $('room-wall-color').value = defaultWallColor;
  roomFloorKind = $('room-floor').value = presentation.floor;
  syncRoomSwatches(roomWallColor);
  selectInspector(presentation.inspector);
  if (!scene) return;
  scene.setLighting(presentation.lighting);
  scene.setRoomStyle({ wallColor: roomWallColor, floorKind: roomFloorKind });
  scene.setBackdrop(backdropMode);
  for (const id of ['projection', 'pins-toggle', 'xray-toggle', 'access-toggle']) $(id).setAttribute('aria-pressed', 'false');
  $('ao-toggle').setAttribute('aria-pressed', 'true');
  xrayEnabled = false;
  accessEnabled = false;
  aoEnabled = true;
  ledTempId = '3500';
  scene.setProjection('perspective');
  scene.setHotspots(false);
  scene.setXray(false);
  scene.setAccessibility(false);
  scene.setAO(true);
  scene.setLedTemp(ledTempId);
  scene.resetPersonPosition(presentation.personStart);
  scene.update(state, { restoreJoints: true });
  scene.view('studio', { yaw: presentation.cameraYaw, immediate: true });
  if (presentation.autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    personAutoRunning = true;
    scene.setPersonAutoRun(true, { waitFirst: true });
    syncPersonAutoToolbar();
    inspector?.sync();
  }
}

$('reset').addEventListener('click', () => {
  stopPersonAuto({ resetPos: true, quiet: true });
  if (presentation) {
    state = defaultState();
    applyPresentation();
    controls();
    showNotice(tr.t('noticeDefaultsRestored'));
    return;
  }
  state = initialState(spec);
  backdropMode = 'studio';
  xrayEnabled = false;
  accessEnabled = false;
  aoEnabled = true;
  ledTempId = '3500';
  $('lighting').value = 'daylight';
  $('backdrop').value = 'studio';
  $('room-bar').hidden = true;
  $('xray-toggle').setAttribute('aria-pressed', 'false');
  $('access-toggle').setAttribute('aria-pressed', 'false');
  $('ao-toggle').setAttribute('aria-pressed', 'true');
  scene?.setLighting('daylight');
  scene?.setBackdrop('studio');
  scene?.setXray(false);
  scene?.setAccessibility(false);
  scene?.setAO(true);
  scene?.setLedTemp('3500');
  controls('animate');
  scene?.view('studio');
  showNotice(tr.t('noticeDefaultsRestored'));
});

const isBarDisabled = el => el.getAttribute('aria-disabled') === 'true';

$('camera').addEventListener('change', e => {
  if (isBarDisabled(e.target)) { e.target.value = ''; return; }
  if (e.target.value) scene?.view(e.target.value);
  e.target.value = '';
});

$('lighting').addEventListener('change', e => {
  if (isBarDisabled(e.target)) return;
  const preset = e.target.value;
  scene?.setLighting(preset);
  if (preset === 'evening' && spec.switches?.some(sw => Boolean(sw.light))) {
    showNotice(tr.t('noticeEveningLightsTip'));
  } else {
    showNotice(tr.t('noticeLighting', { name: e.target.selectedOptions[0].textContent }));
  }
});

$('backdrop').addEventListener('change', e => {
  if (isBarDisabled(e.target)) return;
  backdropMode = e.target.value === 'room' ? 'room' : 'studio';
  $('room-bar').hidden = backdropMode !== 'room';
  scene?.setBackdrop(backdropMode);
  showNotice(tr.t(backdropMode === 'room' ? 'noticeBackdropRoom' : 'noticeBackdropStudio'));
});

function syncRoomSwatches(hex) {
  const norm = hex.toLowerCase();
  for (const b of $('room-wall-swatches').querySelectorAll('.room-swatch')) {
    b.setAttribute('aria-pressed', String(b.dataset.wallHex.toLowerCase() === norm));
  }
}

$('room-wall-swatches').addEventListener('click', e => {
  const btn = e.target.closest('.room-swatch');
  if (!btn) return;
  roomWallColor = btn.dataset.wallHex;
  $('room-wall-color').value = roomWallColor;
  syncRoomSwatches(roomWallColor);
  scene?.setRoomStyle({ wallColor: roomWallColor, floorKind: roomFloorKind });
});

$('room-wall-color').addEventListener('input', e => {
  roomWallColor = e.target.value;
  syncRoomSwatches(roomWallColor);
  scene?.setRoomStyle({ wallColor: roomWallColor, floorKind: roomFloorKind });
});

$('room-floor').addEventListener('change', e => {
  roomFloorKind = e.target.value;
  scene?.setRoomStyle({ wallColor: roomWallColor, floorKind: roomFloorKind });
});

$('xray-toggle').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (isBarDisabled(btn)) return;
  xrayEnabled = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(xrayEnabled));
  scene?.setXray(xrayEnabled);
  showNotice(tr.t(xrayEnabled ? 'noticeXrayOn' : 'noticeXrayOff'));
});

$('access-toggle').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (isBarDisabled(btn)) return;
  toggleAccessibility();
});

$('ao-toggle').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (isBarDisabled(btn)) return;
  aoEnabled = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(aoEnabled));
  scene?.setAO(aoEnabled);
  showNotice(tr.t(aoEnabled ? 'noticeAoOn' : 'noticeAoOff'));
});

$('projection').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (isBarDisabled(btn)) return;
  const nextOrtho = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(nextOrtho));
  scene?.setProjection(nextOrtho ? 'orthographic' : 'perspective');
  showNotice(tr.t(nextOrtho ? 'noticeOrthoOn' : 'noticeOrthoOff'));
});

$('pins-toggle').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (isBarDisabled(btn)) return;
  const nextOn = btn.getAttribute('aria-pressed') !== 'true';
  btn.setAttribute('aria-pressed', String(nextOn));
  scene?.setHotspots(nextOn);
});

$('person-run').addEventListener('click', e => {
  if (isBarDisabled(e.currentTarget)) return;
  if (personAutoRunning) stopPersonAuto();
  else startPersonAuto();
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
    const val = f.tint ? `${tr.term(preset.name)} (${f.tint.toUpperCase()})` : tr.term(preset.name);
    return `${tr.term(s.label)}: ${val}`;
  }).join('  ·  ');
  return {
    name: tr.term(spec.name),
    dimensions: `${d.width.toLocaleString('en-US')} × ${d.depth.toLocaleString('en-US')} × ${d.height.toLocaleString('en-US')} ${tr.mmUnit}`,
    finishes: finishSummary || tr.term(spec.description),
    disclaimer: brand ? `${brand.businessName} · ${tr.t('captionVisualOnly')}` : tr.t('captionDisclaimer'),
    brand: brand ? { name: brand.businessName, logo: brand.logo, description: brand.description ?? null } : null,
    rtl: tr.dir === 'rtl'
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
  showNotice(tr.t('noticeExportedPng', { width, height }));
}

const exportDialog = $('export-dialog');
const sheetDialog = $('sheet-dialog');
function updateExportDims() {
  const wrap = $('canvas-wrap');
  const scale = Number($('exp-scale').value) || 2;
  const w = Math.round(wrap.clientWidth * scale);
  const h = Math.round(wrap.clientHeight * scale) + ($('exp-caption').checked ? Math.round(74 * scale) : 0);
  $('exp-dims').textContent = w && h ? `${w.toLocaleString('en-US')} × ${h.toLocaleString('en-US')} px` : '—';
}

$('export-png').addEventListener('click', () => {
  if (!scene) { showNotice(tr.t('noticeWait3d')); return; }
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
    showNotice(tr.t('noticeExportFailed', { message: err.message }));
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
    showNotice(tr.t('noticeExportFailed', { message: err.message }));
  }
});

$('spec-sheet').addEventListener('click', async () => {
  if (!scene) { showNotice(tr.t('noticeWait3d')); return; }
  const btn = $('spec-sheet');
  btn.disabled = true;
  showNotice(tr.t('specSheetGenerating'));
  try {
    const views = await scene.captureSpecSheetViews();
    const model = buildSpecSheetModel({ spec, state, brand, tr, ledTempId, backdropMode });
    currentSheetViews = views;
    currentSheetModel = model;
    renderSpecSheetDOM($('sheet-preview-body'), model, views, tr);
    renderSpecSheetDOM(printSheetHost, model, views, tr);
    showNotice('');
    sheetDialog.showModal();
  } catch (err) {
    showNotice(tr.t('noticeSheetFailed', { message: err.message }));
  } finally {
    btn.disabled = false;
  }
});
$('sheet-cancel').addEventListener('click', () => sheetDialog.close());
$('sheet-close').addEventListener('click', () => sheetDialog.close());
$('sheet-print').addEventListener('click', () => { window.print(); });
$('sheet-png').addEventListener('click', async () => {
  if (!currentSheetModel || !currentSheetViews) return;
  const btn = $('sheet-png');
  btn.disabled = true;
  try {
    const { blob, width, height } = await composeSpecSheetPng(currentSheetModel, currentSheetViews, tr);
    const slug = spec.name.replace(/[^a-z\d]+/gi, '-').replace(/^-|-$/g, '').slice(0, 64) || 'furniture';
    const d = state.dimensions;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}-${d.width}x${d.depth}x${d.height}-spec-sheet.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showNotice(tr.t('noticeSheetPng', { width, height }));
    sheetDialog.close();
  } catch (err) {
    showNotice(tr.t('noticeSheetFailed', { message: err.message }));
  } finally {
    btn.disabled = false;
  }
});

$('save').addEventListener('click', () => {
  const exportFinishes = {};
  for (const s of spec.slots) {
    const f = state.finishes[s.id];
    const baseCount = initialSlotCounts[s.id] ?? s.finishes.length;
    if (f.index >= baseCount) {
      const preset = s.finishes[f.index];
      exportFinishes[s.id] = { index: 0, tint: f.tint || preset?.color || s.finishes[0].color };
    } else {
      exportFinishes[s.id] = { index: f.index, tint: f.tint };
    }
  }
  const exportState = { ...state, finishes: exportFinishes };
  const blob = new Blob([JSON.stringify({ format: 'form-study/setup@1', model: identity, state: exportState }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url;
  a.download = `${spec.name.replace(/[^a-z\d]+/gi, '-').slice(0, 64) || 'furniture'}-setup.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showNotice(tr.t('noticeSetupSaved'));
});
$('load').addEventListener('click', () => $('file').click());
$('file').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    if (file.size > 262144) throw new Error(tr.t('errSetupTooLarge'));
    const saved = JSON.parse(await file.text());
    if (saved?.format !== 'form-study/setup@1' || saved.model !== identity) throw new Error(tr.t('errWrongModel'));
    const next = validateState(spec, saved.state);
    stopPersonAuto({ resetPos: true, quiet: true });
    state = next;
    controls();
    showNotice(tr.t('noticeSetupRestored'));
  } catch (err) { showNotice(tr.t('noticeSetupFailed', { message: err.message })); }
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

function describeHover(info) {
  if (!info?.action) return null;
  const { action, slotId } = info;
  let title = tr.term(action.label);
  let actionText = '';
  let finishName = '';
  let swatchColor = '';

  if (slotId && state.finishes[slotId]) {
    const slot = spec.slots.find(s => s.id === slotId);
    const f = state.finishes[slotId];
    const preset = slot?.finishes[f.index];
    if (preset) {
      swatchColor = f.tint || preset.color;
      const pName = tr.term(preset.name);
      finishName = f.tint ? `${pName} (${f.tint.toUpperCase()})` : pName;
    }
  }

  if (action.type === 'switch') {
    const on = Boolean(state.switches[action.id]);
    const sw = spec.switches?.find(s => s.id === action.id);
    if (on && sw?.light?.color) swatchColor = sw.light.color;
    finishName = on ? tr.t('switchOn') : tr.t('switchOff');
    actionText = tr.t(on ? 'hoverTurnOff' : 'hoverTurnOn');
  } else if (action.type === 'joint') {
    const val = state.joints[action.id] ?? 0;
    const pct = Math.round(val * 100);
    actionText = val > 0.02 ? tr.t('hoverOpen', { pct }) : tr.t('hoverClosed');
  } else if (action.type === 'option') {
    const cur = tr.term(state.options[action.id]);
    title = `${tr.term(action.label)}: ${cur}`;
    actionText = tr.t('hoverSwitchOption');
  } else if (action.type === 'person') {
    title = tr.t('hoverPerson');
    swatchColor = state.person.top;
    finishName = `${tr.t(charLabelKey(state.person.character))} · ${state.person.height} ${tr.mmUnit}`;
    actionText = tr.t(state.person.pose === 'standing' ? 'hoverSit' : 'hoverStand');
  } else if (action.type === 'slot') {
    if (info.accessZone) {
      swatchColor = REACH_ZONE_COLORS[info.accessZone] || swatchColor;
      const zoneKey = info.accessZone === 'green'
        ? 'hoverAccessGreen'
        : info.accessZone === 'red'
          ? 'hoverAccessRed'
          : 'hoverAccessYellow';
      actionText = tr.t(zoneKey, { y: info.accessHeightMm });
    } else {
      actionText = tr.t('hoverEditFinish');
    }
  }
  return { title, finishName, swatchColor, actionText };
}

function renderHoverPill(info) {
  const pill = $('hover-pill');
  const data = describeHover(info);
  if (!data) {
    pill.hidden = true;
    return;
  }
  const swatch = pill.querySelector('.hover-swatch');
  pill.querySelector('.hover-title').textContent = data.title;
  const finishEl = pill.querySelector('.hover-finish');
  finishEl.textContent = data.finishName;
  finishEl.hidden = !data.finishName;
  if (data.swatchColor) {
    swatch.style.backgroundColor = data.swatchColor;
    swatch.hidden = false;
  } else {
    swatch.hidden = true;
  }
  pill.querySelector('.hover-action').textContent = data.actionText;
  pill.hidden = false;

  const stage = document.querySelector('.stage');
  const sw = stage.clientWidth, sh = stage.clientHeight;
  const pw = pill.offsetWidth, ph = pill.offsetHeight;
  let tx = info.x + 14;
  let ty = info.y - ph - 12;
  if (tx + pw > sw - 10) tx = Math.max(10, info.x - pw - 14);
  if (ty < 10) ty = Math.min(sh - ph - 10, info.y + 18);
  tx = Math.max(10, Math.min(tx, Math.max(10, sw - pw - 10)));
  ty = Math.max(10, Math.min(ty, Math.max(10, sh - ph - 10)));
  pill.style.transform = `translate3d(${Math.round(tx)}px, ${Math.round(ty)}px, 0)`;
}

function handle3DInteract(action) {
  if (!action) return;
  if (action.type === 'switch') {
    const next = !state.switches[action.id];
    state.switches[action.id] = next;
    inspector?.sync();
    paint('animate');
    showNotice(tr.t(next ? 'noticeSwitchOn' : 'noticeSwitchOff', { label: tr.term(action.label) }));
  } else if (action.type === 'joint') {
    const next = state.joints[action.id] > 0.02 ? 0 : 1;
    state.joints[action.id] = next;
    inspector?.sync();
    paint('animate');
    showNotice(tr.t(next ? 'noticeJointOpened' : 'noticeJointClosed', { label: tr.term(action.label) }));
  } else if (action.type === 'option') {
    const opt = spec.options.find(o => o.id === action.id);
    if (!opt) return;
    const idx = opt.choices.indexOf(state.options[opt.id]);
    const next = opt.choices[(idx + 1) % opt.choices.length];
    state.options[opt.id] = next;
    inspector?.sync();
    paint('immediate');
    showNotice(`${tr.term(opt.label)}: ${tr.term(next)}.`);
  } else if (action.type === 'person') {
    const next = state.person.pose === 'standing' ? 'seated' : 'standing';
    state.person.pose = next;
    inspector?.sync();
    paint('immediate');
    showNotice(tr.t('noticePersonPose', { pose: tr.t(next === 'seated' ? 'poseSeated' : 'poseStanding') }));
  } else if (action.type === 'slot') {
    inspector?.focusSlot(action.id);
    showNotice(tr.t('noticeEditingFinish', { label: tr.term(action.label) }));
  }
}

const contextMenuEl = $('stage-context-menu');

function closeContextMenu() {
  if (!contextMenuEl || contextMenuEl.hidden) return;
  contextMenuEl.hidden = true;
  contextMenuEl.replaceChildren();
}

function addMenuItem(label, onSelect, { primary = false } = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = primary ? 'ctx-item ctx-primary' : 'ctx-item';
  btn.setAttribute('role', 'menuitem');
  btn.textContent = label;
  btn.addEventListener('click', () => {
    closeContextMenu();
    onSelect();
  });
  contextMenuEl.append(btn);
}

function openContextMenu(info) {
  if (!scene || !info) return;
  closeContextMenu();
  $('hover-pill').hidden = true;

  if (info.kind === 'floor') {
    const head = document.createElement('div');
    head.className = 'ctx-head';
    head.textContent = tr.term(spec.name);
    contextMenuEl.append(head);
    addMenuItem(tr.t('ctxPersonWalkHere'), () => {
      ensurePersonVisible();
      scene.commandPerson({ kind: 'walk', targetPoint: info.floorPoint, inspect: false });
      showNotice(tr.t('noticePersonWalkingHere'));
    }, { primary: true });
  } else if (info.kind === 'hit' && info.action) {
    const { action, partId, slotId, seat, isOpen, isOn } = info;
    const labelText = tr.term(action.label);
    const head = document.createElement('div');
    head.className = 'ctx-head';
    head.textContent = labelText;
    contextMenuEl.append(head);

    if (action.type === 'joint') {
      addMenuItem(tr.t(isOpen ? 'ctxPersonClose' : 'ctxPersonOpen', { label: labelText }), () => {
        ensurePersonVisible();
        scene.commandPerson({ kind: 'joint', id: action.id });
        showNotice(tr.t('noticePersonGoingTo', { label: labelText }));
      }, { primary: true });
      addMenuItem(tr.t('ctxPersonWalkHere'), () => {
        ensurePersonVisible();
        scene.commandPerson({ kind: 'walk', partId, label: action.label, inspect: false });
        showNotice(tr.t('noticePersonWalkingHere'));
      });
      if (slotId) {
        const slot = spec.slots.find(s => s.id === slotId);
        addMenuItem(tr.t('ctxEditFinish', { label: tr.term(slot?.label || labelText) }), () => {
          inspector?.focusSlot(slotId);
        });
      }
    } else if (action.type === 'switch') {
      addMenuItem(tr.t(isOn ? 'ctxPersonSwitchOff' : 'ctxPersonSwitchOn', { label: labelText }), () => {
        ensurePersonVisible();
        scene.commandPerson({ kind: 'switch', id: action.id });
        showNotice(tr.t('noticePersonGoingTo', { label: labelText }));
      }, { primary: true });
      addMenuItem(tr.t('ctxPersonWalkHere'), () => {
        ensurePersonVisible();
        scene.commandPerson({ kind: 'walk', partId, label: action.label, inspect: false });
        showNotice(tr.t('noticePersonWalkingHere'));
      });
    } else if (action.type === 'person') {
      addMenuItem(personAutoRunning ? tr.t('personStop') : tr.t('personRun'), () => {
        if (personAutoRunning) stopPersonAuto();
        else startPersonAuto();
      }, { primary: true });
      addMenuItem(tr.t('ctxPersonTogglePose'), () => {
        handle3DInteract(action);
      });
      addMenuItem(tr.t('ctxPersonResetPos'), () => {
        stopPersonAuto({ resetPos: true, quiet: true });
        scene.resetPersonPosition();
      });
    } else {
      if (seat) {
        addMenuItem(tr.t(seat.isSeated ? 'ctxPersonStandUp' : 'ctxPersonSitHere', { label: tr.term(seat.label) }), () => {
          ensurePersonVisible();
          scene.commandPerson({ kind: seat.isSeated ? 'stand' : 'sit', seatId: seat.id });
          showNotice(tr.t('noticePersonGoingTo', { label: tr.term(seat.label) }));
        }, { primary: true });
      }
      addMenuItem(tr.t('ctxPersonInspectHere', { label: labelText }), () => {
        ensurePersonVisible();
        scene.commandPerson({ kind: 'walk', partId, label: action.label, inspect: true });
        showNotice(tr.t('noticePersonGoingTo', { label: labelText }));
      }, { primary: !seat });
      if (action.type === 'option') {
        addMenuItem(tr.t('ctxSwitchOption', { label: labelText }), () => {
          handle3DInteract(action);
        });
      }
      if (slotId) {
        const slot = spec.slots.find(s => s.id === slotId);
        addMenuItem(tr.t('ctxEditFinish', { label: tr.term(slot?.label || labelText) }), () => {
          inspector?.focusSlot(slotId);
        });
      }
    }
  } else {
    return;
  }

  contextMenuEl.hidden = false;
  const stage = document.querySelector('.stage');
  const sw = stage.clientWidth;
  const sh = stage.clientHeight;
  const mw = contextMenuEl.offsetWidth;
  const mh = contextMenuEl.offsetHeight;
  const tx = Math.max(8, Math.min(info.x, Math.max(8, sw - mw - 8)));
  const ty = Math.max(8, Math.min(info.y, Math.max(8, sh - mh - 8)));
  contextMenuEl.style.transform = `translate3d(${Math.round(tx)}px, ${Math.round(ty)}px, 0)`;
  contextMenuEl.querySelector('.ctx-item')?.focus();
}

document.addEventListener('pointerdown', e => {
  if (!contextMenuEl.hidden && !contextMenuEl.contains(e.target)) closeContextMenu();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !contextMenuEl.hidden) closeContextMenu();
});
$('canvas-wrap').addEventListener('wheel', () => closeContextMenu(), { passive: true });
window.addEventListener('resize', closeContextMenu);

applyStaticStrings();
controls();
if (presentation) applyPresentation();
const cameras = [...document.querySelectorAll('.camera-bar button,.camera-bar select')];
for (const c of cameras) c.setAttribute('aria-disabled', 'true');
$('export-png').disabled = true;
$('spec-sheet').disabled = true;

let lastBlockNotice = { key: '', time: 0 };

createStudio($('canvas-wrap'), spec, assets, {
  onHover(info) {
    lastHoverInfo = info;
    renderHoverPill(info);
  },
  onInteract(action) {
    handle3DInteract(action);
    if (lastHoverInfo) renderHoverPill(lastHoverInfo);
  },
  onJointBlocked({ id, label, blockerLabel, progress }) {
    state.joints[id] = Math.round(progress * 1000) / 1000;
    inspector?.sync();
    const now = performance.now();
    const key = `${id}:${blockerLabel}`;
    if (lastBlockNotice.key !== key || now - lastBlockNotice.time > 400) {
      lastBlockNotice = { key, time: now };
      showNotice(tr.t('noticeBlocked', {
        label: tr.term(label),
        blocker: tr.term(blockerLabel),
        pct: Math.round(progress * 100)
      }));
    }
  },
  onJointSync(updates) {
    for (const [id, val] of Object.entries(updates)) {
      state.joints[id] = Math.round(val * 1000) / 1000;
    }
    inspector?.sync();
  },
  onContextMenu(info) {
    openContextMenu(info);
  },
  onPersonAutoAction(evt) {
    if (!evt) return;
    if (evt.phase === 'stopped' || evt.phase === 'directed_done') {
      if (evt.phase === 'stopped') personAutoRunning = false;
      personAutoStatus = null;
      syncPersonAutoToolbar();
      inspector?.sync();
      return;
    }
    if (evt.phase === 'waiting') {
      personAutoStatus = { key: 'waiting', sec: evt.nextDelaySec ?? 10 };
      inspector?.sync();
      return;
    }
    if (evt.phase === 'action') {
      if (evt.actionType === 'joint') {
        state.joints[evt.id] = evt.goal;
        personAutoStatus = { key: evt.isOpening ? 'personActOpen' : 'personActClose', label: evt.label };
        inspector?.sync();
        if (!evt.managed) paint('animate');
        else updateFacts();
        showNotice(tr.t(personAutoStatus.key, { label: tr.term(evt.label) }));
      } else if (evt.actionType === 'switch') {
        state.switches[evt.id] = Boolean(evt.goal);
        personAutoStatus = { key: evt.isOpening ? 'personActSwitchOn' : 'personActSwitchOff', label: evt.label };
        inspector?.sync();
        paint('animate');
        showNotice(tr.t(personAutoStatus.key, { label: tr.term(evt.label) }));
      } else if (evt.actionType === 'sit') {
        state.person.pose = 'seated';
        personAutoStatus = { key: 'personActSit', label: evt.label };
        updateFacts();
        inspector?.sync();
        showNotice(tr.t('personActSit', { label: tr.term(evt.label) }));
      } else if (evt.actionType === 'stand') {
        state.person.pose = 'standing';
        personAutoStatus = { key: 'personActStand', label: evt.label };
        updateFacts();
        inspector?.sync();
        showNotice(tr.t('personActStand'));
      } else if (evt.actionType === 'inspect' || evt.actionType === 'walk') {
        personAutoStatus = { key: 'personActInspect', label: evt.label };
        inspector?.sync();
        if (evt.actionType === 'inspect') {
          showNotice(tr.t('personActInspect', { label: tr.term(evt.label) }));
        }
      }
    }
  }
}, makeStudioLocale(tr)).then(s => {
  scene = s;
  sceneReady = true;
  if (!s.hasXrayTargets) $('xray-toggle').hidden = true;
  if (presentation) applyPresentation();
  else {
    s.update(state, { animate: false });
    s.view('studio');
  }
  $('scene-message').hidden = true;
  for (const c of cameras) c.removeAttribute('aria-disabled');
  $('export-png').disabled = false;
  $('spec-sheet').disabled = false;
}).catch(e => {
  sceneErrorMsg = e.message;
  $('scene-message').textContent = tr.t('webglUnavailable', { message: e.message });
});
