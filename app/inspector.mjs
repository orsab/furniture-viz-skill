import { axes } from '../lib/coordinates.mjs';

const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
};
const cap = s => s[0].toUpperCase() + s.slice(1);

function section(host, title, open = false) {
  const details = el('details', 'section'), body = el('div', 'section-body');
  details.open = open;
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

const pairs = values => values.map(v => [v, cap(v)]);

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

function measure(host, labelText, unit, value, min, max, change, actionBtn = null) {
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
    group.append(el('small', 'muted', 'Fixed by the design'));
    setVal = v => { value = v; entry.value = String(v); };
  } else {
    const slider = el('input', 'range');
    slider.type = 'range';
    slider.min = String(min);
    slider.max = String(max);
    slider.step = '1';
    slider.value = String(value);
    slider.setAttribute('aria-label', `${labelText} slider (${unit})`);
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
        error.textContent = `Enter a whole number from ${min} to ${max} ${unit}.`;
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

export function mountInspector(furniture, person, spec, state, onChange) {
  furniture.replaceChildren();
  person.replaceChildren();
  const visibility = [];
  const syncers = [];
  const visibleParts = () => spec.parts.filter(p => p.when.every(c => state.options[c.option] === c.choice));
  const commit = (mode = 'immediate') => {
    const parts = visibleParts();
    for (const refresh of visibility) refresh(parts);
    onChange(mode);
  };

  let finishesController = null;
  if (spec.slots.length) {
    const { details, body } = section(furniture, 'Finishes', true);
    const scope = el('fieldset', 'unboxed'), note = el('p', 'hint');
    let selected = spec.slots[0];
    const slotSelect = select(body, 'Apply finish to', spec.slots.map(s => [s.id, s.label]), selected.id, id => {
      selected = spec.slots.find(s => s.id === id);
      draw();
      refresh(visibleParts());
    });
    body.append(scope, note);
    let swatchRadios = [], writeTint = null, clearBtn = null;
    function refresh(parts) {
      scope.disabled = !parts.some(p => p.slot === selected.id);
      note.hidden = !scope.disabled;
      note.textContent = 'This material group is not visible with the current construction options.';
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
      scope.append(el('legend', 'field-title', 'Finish palette'));
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
        words.append(el('strong', null, finish.name), el('small', null, cap(finish.surface)));
        input.addEventListener('change', () => {
          if (input.checked) { f.index = index; f.tint = null; syncPalette(); onChange('immediate'); }
        });
        label.append(input, dot, words);
        swatches.append(label);
        swatchRadios.push(input);
      });
      writeTint = color(scope, 'Custom tint', f.tint ?? selected.finishes[f.index].color, v => {
        f.tint = v;
        clearBtn.disabled = false;
        onChange('immediate');
      });
      clearBtn = el('button', 'text-button', 'Use preset color');
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
        slotSelect.value = slotId;
        draw();
        refresh(visibleParts());
        slotSelect.focus();
      }
    };
  }

  const { body: dims } = section(furniture, 'Dimensions');
  dims.append(el('p', 'hint', 'Enclosure dimensions in millimeters. Protruding hardware and open parts can extend beyond them.'));
  for (const k of axes) {
    const r = spec.dimensions[k];
    const ctrl = measure(dims, cap(k), 'mm', state.dimensions[k], r.min, r.max, v => {
      state.dimensions[k] = v;
      onChange('immediate');
    });
    syncers.push(() => ctrl.setVal(state.dimensions[k]));
  }
  const guidesBox = toggle(dims, 'Show measurement guides', state.showDimensions, v => {
    state.showDimensions = v;
    onChange('immediate');
  });
  syncers.push(() => { guidesBox.checked = state.showDimensions; });

  if (spec.options.length) {
    const { body } = section(furniture, 'Construction');
    for (const o of spec.options) {
      const sel = select(body, o.label, o.choices.map(v => [v, v]), state.options[o.id], v => {
        state.options[o.id] = v;
        commit('immediate');
      });
      syncers.push(() => { sel.value = state.options[o.id]; });
    }
  }

  if (spec.joints.length) {
    const { body } = section(furniture, 'Doors & movement', true);
    if (spec.joints.length >= 2) {
      const row = el('div', 'joint-bulk');
      const openAll = el('button', 'chip-button', 'Open all');
      openAll.type = 'button';
      const closeAll = el('button', 'chip-button', 'Close all');
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
      const group = el('fieldset', 'unboxed'), hint = el('small', 'hint', 'Not visible in this configuration.');
      group.append(el('legend', 'sr-only', j.label));
      const toggleBtn = el('button', 'joint-toggle');
      toggleBtn.type = 'button';
      const syncToggleLabel = pct => {
        const isOpen = pct > 2;
        toggleBtn.textContent = isOpen ? 'Close' : 'Open';
        toggleBtn.setAttribute('aria-label', `${isOpen ? 'Close' : 'Open'} ${j.label}`);
      };
      const pctInit = Math.round(state.joints[j.id] * 100);
      syncToggleLabel(pctInit);
      const ctrl = measure(group, j.label, '%', pctInit, 0, 100, v => {
        state.joints[j.id] = v / 100;
        syncToggleLabel(v);
        onChange('immediate');
      }, toggleBtn);
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
    const { body } = section(furniture, 'Switches & lighting', true);
    for (const sw of spec.switches) {
      const group = el('fieldset', 'unboxed switch-group');
      const hint = el('small', 'hint', 'Not visible in this configuration.');
      group.append(el('legend', 'sr-only', sw.label));
      const row = el('div', 'switch-row');
      const labelId = `sw-lbl-${sw.id}`;
      const labelSpan = el('span', 'field-title', sw.label);
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
        stateText.textContent = on ? 'On' : 'Off';
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
  }

  if (spec.inscription) {
    const { body } = section(furniture, 'Personalization');
    const label = el('label', 'field'), input = el('input');
    input.type = 'text';
    input.maxLength = 32;
    input.value = state.inscription;
    input.placeholder = 'e.g. Studio No. 04';
    label.append(el('span', 'field-title', 'Nameplate text'), input);
    body.append(label, el('p', 'hint', 'Up to 32 characters. Leave blank to remove the plate.'));
    input.addEventListener('input', () => { state.inscription = input.value; commit('immediate'); });
    syncers.push(() => { input.value = state.inscription; });
  }

  const ref = el('div', 'figure-intro');
  person.append(ref);
  ref.append(
    el('h3', null, 'Human scale'),
    el('p', 'hint', 'A reference mannequin beside the piece. Standing stature sets its scale in either pose; it is not a fit assessment.')
  );
  const p = state.person;
  const visibleBox = toggle(ref, 'Show reference person', p.visible, v => { p.visible = v; commit('immediate'); });
  syncers.push(() => { visibleBox.checked = p.visible; });

  const figure = el('fieldset', 'unboxed figure-settings');
  figure.append(el('legend', 'sr-only', 'Reference person settings'));
  person.append(figure);
  const { body } = section(figure, 'Size & pose', true);
  const statureCtrl = measure(body, 'Standing stature', 'mm', p.height, 900, 2200, v => {
    p.height = v;
    onChange('immediate');
  });
  syncers.push(() => statureCtrl.setVal(p.height));

  for (const [key, label, choices] of [
    ['build', 'Build', ['slim', 'regular', 'broad']],
    ['pose', 'Pose', ['standing', 'seated']],
    ['side', 'Placement', ['left', 'right']]
  ]) {
    const sel = select(body, label, pairs(choices), p[key], v => { p[key] = v; onChange('immediate'); });
    syncers.push(() => { sel.value = p[key]; });
  }
  const yawCtrl = measure(body, 'Facing angle', '°', p.yaw, -180, 180, v => {
    p.yaw = v;
    onChange('immediate');
  });
  syncers.push(() => yawCtrl.setVal(p.yaw));

  const { body: colors } = section(figure, 'Figure colors');
  for (const [key, label] of [['skin', 'Skin tone'], ['top', 'Top color'], ['bottom', 'Trouser color']]) {
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
    focusSlot(slotId) { finishesController?.focusSlot(slotId); }
  };
}
