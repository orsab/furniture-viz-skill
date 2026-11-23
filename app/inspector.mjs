import { axes } from '../lib/coordinates.mjs';

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

function measure(host, labelText, unit, value, min, max, change, tr, actionBtn = null) {
  const group = el('div', 'measure'), label = el('label', 'measure-entry'), entry = el('input'), suffix = el('span', 'suffix', unit);
  entry.type = 'number';
  entry.step = '1';
  entry.min = String(min);
  entry.max = String(max);
  entry.required = true;
  entry.value = String(value);
  const title = el('span', 'field-title', labelText);
  label.append(title, entry, suffix);
  if (actionBtn) label.append(actionBtn);
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
  return { group, setVal };
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
    if (spec.joints.length >= 2) {
      const row = el('div', 'joint-bulk');
      const openAll = el('button', 'chip-button', tr.t('openAll'));
      openAll.type = 'button';
      const closeAll = el('button', 'chip-button', tr.t('closeAll'));
      closeAll.type = 'button';
      openAll.addEventListener('click', () => {
        for (const j of spec.joints) state.joints[j.id] = 1;
        sync();
        onChange('animate');
      });
      closeAll.addEventListener('click', () => {
        for (const j of spec.joints) state.joints[j.id] = 0;
        sync();
        onChange('animate');
      });
      row.append(openAll, closeAll);
      body.append(row);
    }
    for (const j of spec.joints) {
      const group = el('fieldset', 'unboxed'), hint = el('small', 'hint', tr.t('notVisibleHint'));
      const jLabel = tr.term(j.label);
      group.append(el('legend', 'sr-only', jLabel));
      const toggleBtn = el('button', 'joint-toggle');
      toggleBtn.type = 'button';
      const syncToggleLabel = pct => {
        const isOpen = pct > 2;
        toggleBtn.textContent = isOpen ? tr.t('close') : tr.t('open');
        toggleBtn.setAttribute('aria-label', tr.t(isOpen ? 'closeActionLabel' : 'openActionLabel', { label: jLabel }));
      };
      const pctInit = Math.round(state.joints[j.id] * 100);
      syncToggleLabel(pctInit);
      const ctrl = measure(group, jLabel, '%', pctInit, 0, 100, v => {
        state.joints[j.id] = v / 100;
        syncToggleLabel(v);
        onChange('immediate');
      }, tr, toggleBtn);
      toggleBtn.addEventListener('click', () => {
        const next = state.joints[j.id] > 0.02 ? 0 : 1;
        state.joints[j.id] = next;
        const pct = Math.round(next * 100);
        ctrl.setVal(pct);
        syncToggleLabel(pct);
        onChange('animate');
      });
      body.append(group, hint);
      visibility.push(parts => {
        group.disabled = !parts.some(p => p.joint === j.id) && !(state.inscription && spec.inscription?.joint === j.id);
        hint.hidden = !group.disabled;
      });
      syncers.push(() => {
        const pct = Math.round(state.joints[j.id] * 100);
        ctrl.setVal(pct);
        syncToggleLabel(pct);
      });
    }
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
