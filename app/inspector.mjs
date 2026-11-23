import { axes } from '../lib/coordinates.mjs';
import { extractPaletteFromRgba, parseMaterialsFromText } from '../lib/materials-parse.mjs';

const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
};

function section(host, key, title, openDefault, openSet) {
  const details = el('details', 'section'), body = el('div', 'section-body');
  details.dataset.section = key;
  details.open = openSet ? openSet.has(key) : openDefault;
  details.append(el('summary', null, title), body);
  host.append(details);
  return { details, body };
}

function select(host, labelText, entries, value, onChange) {
  const label = el('label', 'field'), input = el('select');
  for (const [val, name] of entries) input.add(new Option(name, val));
  input.value = value;
  input.addEventListener('change', () => onChange(input.value));
  label.append(el('span', 'field-title', labelText), input);
  host.append(label);
  return input;
}

function toggle(host, labelText, checked, change) {
  const label = el('label', 'check-row'), box = el('input');
  box.type = 'checkbox';
  box.checked = checked;
  box.addEventListener('change', () => change(box.checked));
  label.append(box, el('span', null, labelText));
  host.append(label);
  return box;
}

function color(host, labelText, value, change) {
  const label = el('label', 'color-field'), box = el('input'), code = el('span', 'color-code', value.toUpperCase());
  box.type = 'color';
  box.value = value;
  box.addEventListener('input', () => { code.textContent = box.value.toUpperCase(); change(box.value); });
  label.append(el('span', 'field-title', labelText), code, box);
  host.append(label);
  return v => { box.value = v; code.textContent = v.toUpperCase(); };
}

function measure(host, labelText, unit, value, min, max, change, tr) {
  const group = el('div', 'measure'), label = el('label', 'measure-entry'), entry = el('input'), suffix = el('span', 'suffix', unit);
  entry.type = 'number';
  entry.step = '1';
  entry.min = String(min);
  entry.max = String(max);
  entry.required = true;
  entry.value = String(value);
  const title = el('span', 'field-title', labelText);
  label.append(title, entry, suffix);
  group.append(label);
  let setVal;
  if (min === max) {
    entry.readOnly = true;
    group.append(el('small', 'muted', tr.t('fixedByDesign')));
    setVal = v => { value = v; entry.value = String(v); };
  } else {
    const slider = el('input', 'range');
    slider.type = 'range';
    slider.min = String(min);
    slider.max = String(max);
    slider.step = '1';
    slider.value = String(value);
    slider.setAttribute('aria-label', `${labelText} (${unit})`);
    const error = el('small', 'error');
    error.setAttribute('role', 'status');
    error.hidden = true;
    const apply = () => {
      value = entry.valueAsNumber;
      slider.value = String(value);
      error.hidden = true;
      entry.removeAttribute('aria-invalid');
      change(value);
    };
    entry.addEventListener('input', () => {
      if (entry.validity.valid) apply();
      else {
        entry.setAttribute('aria-invalid', 'true');
        error.textContent = tr.t('invalidWholeNumber', { min, max, unit });
        error.hidden = false;
      }
    });
    entry.addEventListener('blur', () => {
      if (!entry.validity.valid) {
        entry.value = String(value);
        entry.removeAttribute('aria-invalid');
        error.hidden = true;
      }
    });
    slider.addEventListener('input', () => { entry.value = slider.value; apply(); });
    const limits = el('div', 'range-limits');
    limits.append(el('span', null, `${min} ${unit}`), el('span', null, `${max} ${unit}`));
    group.append(slider, limits, error);
    setVal = v => {
      value = v;
      entry.value = String(v);
      slider.value = String(v);
      entry.removeAttribute('aria-invalid');
      error.hidden = true;
    };
  }
  host.append(group);
  return { setVal };
}

const SURFACE_KEY = {
  wood: 'surfaceWood',
  fabric: 'surfaceFabric',
  metal: 'surfaceMetal',
  paint: 'surfacePaint'
};

export function mountInspector(furniture, person, spec, state, onChange, tr, preserved = null, lightingCtrl = null, personCtrl = null) {
  furniture.replaceChildren();
  person.replaceChildren();
  const visibility = [];
  const syncers = [];
  const openSet = preserved?.openSections ?? null;
  const visibleParts = () => spec.parts.filter(p => p.when.every(c => state.options[c.option] === c.choice));
  const commit = (mode = 'immediate') => {
    const parts = visibleParts();
    for (const refresh of visibility) refresh(parts);
    onChange(mode);
  };

  let finishesController = null;
  let currentSlotId = preserved?.selectedSlot && spec.slots.some(s => s.id === preserved.selectedSlot)
    ? preserved.selectedSlot
    : (spec.slots[0]?.id ?? null);

  if (spec.slots.length) {
    const { details, body } = section(furniture, 'finishes', tr.t('finishes'), true, openSet);
    const scope = el('fieldset', 'unboxed'), note = el('p', 'hint');
    let selected = spec.slots.find(s => s.id === currentSlotId) || spec.slots[0];
    const slotSelect = select(body, tr.t('applyFinishTo'), spec.slots.map(s => [s.id, tr.term(s.label)]), selected.id, id => {
      selected = spec.slots.find(s => s.id === id);
      currentSlotId = selected.id;
      draw();
      refresh(visibleParts());
    });
    body.append(scope, note);
    let swatchRadios = [], writeTint = null, clearBtn = null;
    function refresh(parts) {
      scope.disabled = !parts.some(p => p.slot === selected.id);
      note.hidden = !scope.disabled;
      note.textContent = tr.t('finishHiddenHint');
    }
    function syncPalette() {
      const f = state.finishes[selected.id];
      swatchRadios.forEach((input, idx) => { input.checked = f.index === idx; });
      const colorVal = f.tint ?? selected.finishes[f.index].color;
      writeTint?.(colorVal);
      if (clearBtn) clearBtn.disabled = f.tint === null;
    }
    function draw() {
      scope.replaceChildren();
      swatchRadios = [];
      const f = state.finishes[selected.id];
      scope.append(el('legend', 'field-title', tr.t('finishPalette')));
      const swatches = el('div', 'swatches');
      scope.append(swatches);
      selected.finishes.forEach((finish, index) => {
        const label = el('label', 'swatch'), input = el('input'), dot = el('span', 'sample'), words = el('span', 'sample-label');
        input.type = 'radio';
        input.name = 'finish';
        input.value = String(index);
        input.checked = f.index === index;
        dot.style.setProperty('--sample', finish.color);
        dot.dataset.surface = finish.surface;
        dot.setAttribute('aria-hidden', 'true');
        words.append(el('strong', null, tr.term(finish.name)), el('small', null, tr.t(SURFACE_KEY[finish.surface] || finish.surface)));
        input.addEventListener('change', () => {
          if (input.checked) { f.index = index; f.tint = null; syncPalette(); onChange('immediate'); }
        });
        label.append(input, dot, words);
        swatches.append(label);
        swatchRadios.push(input);
      });
      writeTint = color(scope, tr.t('customTint'), f.tint ?? selected.finishes[f.index].color, v => {
        f.tint = v;
        clearBtn.disabled = false;
        onChange('immediate');
      });
      clearBtn = el('button', 'text-button', tr.t('usePresetColor'));
      clearBtn.type = 'button';
      clearBtn.addEventListener('click', () => { f.tint = null; syncPalette(); onChange('immediate'); });
      scope.append(clearBtn);
      syncPalette();
    }
    draw();
    visibility.push(refresh);
    syncers.push(syncPalette);

    // Collapsible importer to parse text lists or sample sketch/palette images offline.
    const matDetails = el('details', 'mat-import');
    const matSum = el('summary', null, tr.t('matImportTitle'));
    const matBody = el('div', 'mat-import-body');
    matDetails.append(matSum, matBody);
    matBody.append(el('p', 'hint', tr.t('matImportHint')));

    const textLabel = el('label', 'field');
    textLabel.append(el('span', 'field-title', tr.t('matTextLabel')));
    const textInput = el('textarea', 'mat-text-input');
    textInput.rows = 2;
    textInput.placeholder = tr.t('matTextPlaceholder');
    textLabel.append(textInput);

    const surfaceWrap = el('label', 'field');
    surfaceWrap.append(el('span', 'field-title', tr.t('matSurfaceLabel')));
    const surfaceSel = el('select');
    for (const kind of ['paint', 'wood', 'metal', 'fabric']) {
      surfaceSel.add(new Option(tr.t(SURFACE_KEY[kind]), kind));
    }

    const btnRow = el('div', 'mat-import-row');
    const parseBtn = el('button', 'chip-button', tr.t('matParseBtn'));
    parseBtn.type = 'button';
    const sketchBtn = el('button', 'chip-button', tr.t('matSketchBtn'));
    sketchBtn.type = 'button';
    const fileInput = el('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png,image/jpeg,image/webp';
    fileInput.hidden = true;
    btnRow.append(parseBtn, sketchBtn, fileInput);

    const sketchCanvas = el('canvas', 'mat-import-canvas');
    sketchCanvas.hidden = true;
    const sketchHint = el('p', 'hint', tr.t('matSketchHint'));
    sketchHint.hidden = true;
    const candHead = el('span', 'field-title', tr.t('matDetectedLabel'));
    candHead.hidden = true;
    const candStatus = el('p', 'hint mat-import-status');
    candStatus.hidden = true;
    const candList = el('div', 'mat-candidates');

    let loadedSketchPixels = null;

    function applyCandidate(cand) {
      const targetSlot = cand.slotId
        ? (spec.slots.find(s => s.id === cand.slotId) || selected)
        : selected;
      let idx = targetSlot.finishes.findIndex(
        f => (f.color.toLowerCase() === cand.color.toLowerCase() && f.surface === cand.surface) ||
          f.name.toLowerCase() === cand.name.toLowerCase()
      );
      if (idx < 0) {
        if (targetSlot.finishes.length >= 64) targetSlot.finishes.pop();
        targetSlot.finishes.push({ name: cand.name, color: cand.color, surface: cand.surface });
        idx = targetSlot.finishes.length - 1;
      }
      if (targetSlot.id !== selected.id) {
        selected = targetSlot;
        currentSlotId = targetSlot.id;
        slotSelect.value = targetSlot.id;
      }
      state.finishes[targetSlot.id] = { index: idx, tint: null };
      draw();
      refresh(visibleParts());
      onChange('immediate');
      candStatus.textContent = tr.t('matAddedToSlot', { name: cand.name });
      candStatus.hidden = false;
      lightingCtrl?.onMaterialNotice?.(cand.name, tr.term(targetSlot.label));
    }

    function renderCandidates(items) {
      candList.replaceChildren();
      if (!items.length) {
        candHead.hidden = true;
        candStatus.textContent = tr.t('matEmptyResult');
        candStatus.hidden = false;
        return;
      }
      candHead.hidden = false;
      candStatus.hidden = true;
      for (const cand of items) {
        const chip = el('button', 'mat-chip');
        chip.type = 'button';
        const dot = el('span', 'mat-chip-dot');
        dot.style.backgroundColor = cand.color;
        const surfLabel = tr.t(SURFACE_KEY[cand.surface] || cand.surface);
        chip.append(dot, el('span', null, `${cand.name} (${surfLabel})`));
        chip.addEventListener('click', () => applyCandidate(cand));
        candList.append(chip);
      }
    }

    parseBtn.addEventListener('click', () => {
      const found = parseMaterialsFromText(textInput.value, { existingSlots: spec.slots });
      renderCandidates(found);
    });

    sketchBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => {
      const file = e.target.files?.[0];
      fileInput.value = '';
      if (!file) return;
      const objUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 360;
          const ratio = Math.min(1, maxDim / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
          const w = Math.max(1, Math.round(img.naturalWidth * ratio));
          const h = Math.max(1, Math.round(img.naturalHeight * ratio));
          sketchCanvas.width = w;
          sketchCanvas.height = h;
          const ctx = sketchCanvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h);
          loadedSketchPixels = { rgba: data.data, width: w, height: h };
          sketchCanvas.hidden = false;
          sketchHint.hidden = false;
          renderCandidates(extractPaletteFromRgba(data.data, w, h, {
            maxColors: 6,
            surface: surfaceSel.value,
            lang: tr.lang
          }));
        } catch {
          candStatus.textContent = tr.t('matSketchError');
          candStatus.hidden = false;
        } finally {
          URL.revokeObjectURL(objUrl);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(objUrl);
        candStatus.textContent = tr.t('matSketchError');
        candStatus.hidden = false;
      };
      img.src = objUrl;
    });

    surfaceSel.addEventListener('change', () => {
      if (!loadedSketchPixels) return;
      renderCandidates(extractPaletteFromRgba(loadedSketchPixels.rgba, loadedSketchPixels.width, loadedSketchPixels.height, {
        maxColors: 6,
        surface: surfaceSel.value,
        lang: tr.lang
      }));
    });

    sketchCanvas.addEventListener('click', e => {
      if (!loadedSketchPixels) return;
      const rect = sketchCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.min(sketchCanvas.width - 1, Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * sketchCanvas.width)));
      const y = Math.min(sketchCanvas.height - 1, Math.max(0, Math.floor(((e.clientY - rect.top) / rect.height) * sketchCanvas.height)));
      const i = (y * sketchCanvas.width + x) * 4;
      const hex = `#${[loadedSketchPixels.rgba[i], loadedSketchPixels.rgba[i + 1], loadedSketchPixels.rgba[i + 2]]
        .map(v => v.toString(16).padStart(2, '0')).join('')}`;
      applyCandidate({ name: hex.toUpperCase(), color: hex, surface: surfaceSel.value, slotId: null });
    });

    surfaceWrap.append(surfaceSel);
    matBody.append(textLabel, surfaceWrap, btnRow, sketchCanvas, sketchHint, candHead, candStatus, candList);
    body.append(matDetails);

    finishesController = {
      focusSlot(slotId) {
        const found = spec.slots.find(s => s.id === slotId);
        if (!found) return;
        document.getElementById('furniture-tab')?.click();
        details.open = true;
        selected = found;
        currentSlotId = found.id;
        slotSelect.value = slotId;
        draw();
        refresh(visibleParts());
        slotSelect.focus();
      }
    };
  }

  const { body: dims } = section(furniture, 'dimensions', tr.t('dimensions'), false, openSet);
  dims.append(el('p', 'hint', tr.t('dimensionsHint')));
  const axisLabels = { width: tr.t('axisWidth'), height: tr.t('axisHeight'), depth: tr.t('axisDepth') };
  for (const k of axes) {
    const r = spec.dimensions[k];
    const ctrl = measure(dims, axisLabels[k], tr.mmUnit, state.dimensions[k], r.min, r.max, v => {
      state.dimensions[k] = v;
      onChange('immediate');
    }, tr);
    syncers.push(() => ctrl.setVal(state.dimensions[k]));
  }
  const guidesBox = toggle(dims, tr.t('showGuides'), state.showDimensions, v => {
    state.showDimensions = v;
    onChange('immediate');
  });
  syncers.push(() => { guidesBox.checked = state.showDimensions; });

  if (spec.options.length) {
    const { body } = section(furniture, 'construction', tr.t('construction'), false, openSet);
    for (const o of spec.options) {
      const sel = select(body, tr.term(o.label), o.choices.map(v => [v, tr.term(v)]), state.options[o.id], v => {
        state.options[o.id] = v;
        commit('immediate');
      });
      syncers.push(() => { sel.value = state.options[o.id]; });
    }
  }

  if (spec.joints.length) {
    const { body } = section(furniture, 'joints', tr.t('doorsAndMovement'), true, openSet);
    const row = el('div', 'joint-bulk');
    for (const [label, target] of [['openAll', 1], ['closeAll', 0]]) {
      const button = el('button', 'chip-button', tr.t(label));
      button.type = 'button';
      button.addEventListener('click', () => {
        for (const { id } of spec.joints) state.joints[id] = target;
        onChange('animate');
      });
      row.append(button);
    }
    body.append(row);
  }

  if (spec.switches?.length) {
    const { body } = section(furniture, 'switches', tr.t('switchesAndLighting'), true, openSet);
    for (const sw of spec.switches) {
      const group = el('fieldset', 'unboxed switch-group');
      const hint = el('small', 'hint', tr.t('notVisibleHint'));
      const swLabel = tr.term(sw.label);
      group.append(el('legend', 'sr-only', swLabel));
      const row = el('div', 'switch-row');
      const labelId = `sw-lbl-${sw.id}`;
      const labelSpan = el('span', 'field-title', swLabel);
      labelSpan.id = labelId;
      const btn = el('button', 'switch-btn');
      btn.type = 'button';
      btn.setAttribute('role', 'switch');
      btn.setAttribute('aria-labelledby', labelId);
      const track = el('span', 'switch-track');
      track.setAttribute('aria-hidden', 'true');
      const stateText = el('span', 'switch-state');
      btn.append(track, stateText);
      const syncSwitch = () => {
        const on = Boolean(state.switches[sw.id]);
        btn.setAttribute('aria-checked', String(on));
        stateText.textContent = on ? tr.t('switchOn') : tr.t('switchOff');
      };
      syncSwitch();
      btn.addEventListener('click', () => {
        state.switches[sw.id] = !state.switches[sw.id];
        syncSwitch();
        onChange('animate');
      });
      row.append(labelSpan, btn);
      group.append(row);
      body.append(group, hint);
      const targetIds = new Set([...sw.parts, ...(sw.light?.emissiveParts ?? [])]);
      visibility.push(parts => {
        group.disabled = !parts.some(p => targetIds.has(p.def?.id ?? p.id));
        hint.hidden = !group.disabled;
      });
      syncers.push(syncSwitch);
    }

    if (lightingCtrl && spec.switches.some(sw => Boolean(sw.light))) {
      const kRow = el('div', 'kelvin-row');
      kRow.append(el('span', 'field-title', tr.t('ledTempLabel')));
      const chips = el('div', 'kelvin-chips');
      chips.setAttribute('role', 'group');
      chips.setAttribute('aria-label', tr.t('ledTempLabel'));
      const kelvinEntries = [
        ['2700', tr.t('ledTemp2700')],
        ['3500', tr.t('ledTemp3500')],
        ['4500', tr.t('ledTemp4500')]
      ];
      const buttons = kelvinEntries.map(([id, text]) => {
        const b = el('button', 'chip-button', text);
        b.type = 'button';
        b.dataset.kelvin = id;
        b.addEventListener('click', () => {
          lightingCtrl.onLedTemp?.(id);
          syncKelvin();
        });
        chips.append(b);
        return b;
      });
      const syncKelvin = () => {
        const active = String(lightingCtrl.getLedTemp?.() ?? '3500');
        for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.kelvin === active));
      };
      syncKelvin();
      kRow.append(chips);
      body.append(kRow);
      syncers.push(syncKelvin);
    }
  }

  if (spec.inscription) {
    const { body } = section(furniture, 'inscription', tr.t('personalization'), false, openSet);
    const label = el('label', 'field'), input = el('input');
    input.type = 'text';
    input.maxLength = 32;
    input.value = state.inscription;
    input.placeholder = tr.t('nameplatePlaceholder');
    label.append(el('span', 'field-title', tr.t('nameplateText')), input);
    body.append(label, el('p', 'hint', tr.t('nameplateHint')));
    input.addEventListener('input', () => { state.inscription = input.value; commit('immediate'); });
    syncers.push(() => { input.value = state.inscription; });
  }

  const ref = el('div', 'figure-intro');
  person.append(ref);
  ref.append(
    el('h3', null, tr.t('humanScale')),
    el('p', 'hint', tr.t('humanScaleHint'))
  );
  const p = state.person;
  const visibleBox = toggle(ref, tr.t('showPerson'), p.visible, v => {
    p.visible = v;
    if (!v && personCtrl?.isRunning?.()) personCtrl.onStop?.();
    commit('immediate');
  });
  syncers.push(() => { visibleBox.checked = p.visible; });

  if (personCtrl) {
    const autoCard = el('div', 'person-auto-card');
    const autoHead = el('strong', 'person-auto-title', tr.t('personAutoTitle'));
    const autoHint = el('p', 'hint', tr.t('personAutoHint'));
    const autoActions = el('div', 'person-auto-actions');
    const runBtn = el('button', 'chip-button', tr.t('personRun'));
    runBtn.id = 'person-panel-run';
    runBtn.type = 'button';
    runBtn.title = tr.t('personRunTitle');
    const stopBtn = el('button', 'chip-button', tr.t('personStop'));
    stopBtn.id = 'person-panel-stop';
    stopBtn.type = 'button';
    stopBtn.title = tr.t('personStopTitle');
    const statusLine = el('p', 'person-auto-status');
    statusLine.setAttribute('aria-live', 'polite');

    const syncAuto = () => {
      const running = Boolean(personCtrl.isRunning?.());
      runBtn.disabled = running;
      stopBtn.disabled = !running;
      runBtn.setAttribute('aria-pressed', String(running));
      statusLine.textContent = personCtrl.getStatusText?.() || tr.t('personAutoIdle');
    };
    runBtn.addEventListener('click', () => {
      personCtrl.onRun?.();
      syncAuto();
    });
    stopBtn.addEventListener('click', () => {
      personCtrl.onStop?.();
      syncAuto();
    });
    autoActions.append(runBtn, stopBtn);
    autoCard.append(autoHead, autoHint, autoActions, statusLine);
    ref.append(autoCard);
    syncers.push(syncAuto);
    syncAuto();
  }

  const figure = el('fieldset', 'unboxed figure-settings');
  figure.append(el('legend', 'sr-only', tr.t('personSettingsLegend')));
  person.append(figure);
  const { body } = section(figure, 'person-pose', tr.t('sizeAndPose'), true, openSet);
  const statureCtrl = measure(body, tr.t('standingStature'), tr.mmUnit, p.height, 900, 2200, v => {
    p.height = v;
    onChange('immediate');
  }, tr);
  syncers.push(() => statureCtrl.setVal(p.height));

  for (const [key, label, choices] of [
    ['build', tr.t('build'), [['slim', tr.t('buildSlim')], ['regular', tr.t('buildRegular')], ['broad', tr.t('buildBroad')]]],
    ['pose', tr.t('pose'), [['standing', tr.t('poseStanding')], ['seated', tr.t('poseSeated')]]],
    ['side', tr.t('placement'), [['left', tr.t('sideLeft')], ['right', tr.t('sideRight')]]]
  ]) {
    const sel = select(body, label, choices, p[key], v => { p[key] = v; onChange('immediate'); });
    syncers.push(() => { sel.value = p[key]; });
  }
  const yawCtrl = measure(body, tr.t('facingAngle'), '°', p.yaw, -180, 180, v => {
    p.yaw = v;
    onChange('immediate');
  }, tr);
  syncers.push(() => yawCtrl.setVal(p.yaw));

  const { body: colors } = section(figure, 'person-colors', tr.t('figureColors'), false, openSet);
  for (const [key, label] of [['skin', tr.t('skinTone')], ['top', tr.t('topColor')], ['bottom', tr.t('trouserColor')]]) {
    const setColor = color(colors, label, p[key], v => { p[key] = v; onChange('immediate'); });
    syncers.push(() => setColor(p[key]));
  }
  visibility.push(() => { figure.disabled = !p.visible; });

  function sync() {
    const parts = visibleParts();
    for (const fn of syncers) fn();
    for (const refresh of visibility) refresh(parts);
  }

  for (const refresh of visibility) refresh(visibleParts());
  return {
    sync,
    focusSlot(slotId) { finishesController?.focusSlot(slotId); },
    getSelectedSlot: () => currentSlotId
  };
}
