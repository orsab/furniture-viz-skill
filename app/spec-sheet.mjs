export function buildSpecSheetModel({ spec, state, brand = null, tr, ledTempId = '3500', backdropMode = 'studio' }) {
  const modelName = tr.term(spec.name);
  const description = tr.term(spec.description);
  const businessName = brand?.businessName || tr.t('brandName');
  const businessDesc = brand?.description || '';
  const logo = brand?.logo || null;
  const d = state.dimensions;
  const dimensionsText = `${d.width.toLocaleString('en-US')} × ${d.depth.toLocaleString('en-US')} × ${d.height.toLocaleString('en-US')} ${tr.mmUnit}`;
  const dateText = new Date().toLocaleDateString(tr.lang === 'he' ? 'he-IL' : 'en-US');

  const finishes = (spec.slots || []).map(slot => {
    const f = state.finishes?.[slot.id] || { index: 0, tint: null };
    const preset = slot.finishes?.[f.index] || slot.finishes?.[0];
    return {
      slotId: slot.id,
      label: tr.term(slot.label),
      presetName: preset ? tr.term(preset.name) : '',
      swatch: f.tint || preset?.color || '#cccccc',
      tint: f.tint ? f.tint.toUpperCase() : null
    };
  });

  const options = (spec.options || []).map(opt => ({
    id: opt.id,
    label: tr.term(opt.label),
    value: tr.term(state.options?.[opt.id] ?? opt.defaultChoice)
  }));

  const hasLitSwitch = (spec.switches || []).some(sw => Boolean(sw.light));
  const ledKelvin = hasLitSwitch
    ? ({ '2700': '2700K', '3500': '3500K', '4500': '4500K' }[String(ledTempId)] || '3500K')
    : null;

  const estimates = [...new Set((spec.evidence || []).filter(e => e.status === 'estimated').map(e => tr.term(e.field)))];
  const notesText = estimates.length
    ? tr.t('estimatesPrefix', { items: estimates.join(', ') })
    : tr.t('noEstimates');

  return {
    modelName,
    description,
    businessName,
    businessDesc,
    logo,
    dimensionsText,
    dateText,
    finishes,
    options,
    ledKelvin,
    backdropMode,
    estimates,
    notesText,
    disclaimer: tr.t('captionDisclaimer'),
    rtl: tr.dir === 'rtl'
  };
}

const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
};

export function renderSpecSheetDOM(container, model, views, tr) {
  container.replaceChildren();
  const sheet = el('article', 'spec-sheet');
  sheet.dir = model.rtl ? 'rtl' : 'ltr';

  const head = el('header', 'ss-head');
  const brandRow = el('div', 'ss-brand-row');
  if (model.logo) {
    const img = el('img', 'ss-logo');
    img.src = model.logo;
    img.alt = '';
    brandRow.append(img);
  }
  const titleBlock = el('div', 'ss-title-block');
  const brandMeta = el('p', 'ss-brand-name', model.businessDesc ? `${model.businessName} · ${model.businessDesc}` : model.businessName);
  const title = el('h3', 'ss-model-name', model.modelName);
  const desc = el('p', 'ss-model-desc', model.description);
  titleBlock.append(brandMeta, title, desc);
  brandRow.append(titleBlock);

  const metaBox = el('div', 'ss-meta-box');
  const dimItem = el('div', 'ss-meta-item');
  dimItem.append(el('span', 'ss-meta-k', tr.t('sheetDimensions')), el('strong', 'ss-meta-v ss-ltr', model.dimensionsText));
  const dateItem = el('div', 'ss-meta-item');
  dateItem.append(el('span', 'ss-meta-k', tr.t('sheetDate')), el('strong', 'ss-meta-v ss-ltr', model.dateText));
  metaBox.append(dimItem, dateItem);
  head.append(brandRow, metaBox);

  const grid = el('div', 'ss-grid');
  const entries = [
    ['studio', tr.t('sheetViewStudio'), views.studio],
    ['front', tr.t('sheetViewFront'), views.front],
    ['side', tr.t('sheetViewSide'), views.side],
    ['interior', tr.t('sheetViewInterior'), views.interior]
  ];
  for (const [, captionText, dataUrl] of entries) {
    const fig = el('figure', 'ss-view');
    const img = el('img');
    img.src = dataUrl;
    img.alt = captionText;
    fig.append(img, el('figcaption', 'ss-cap', captionText));
    grid.append(fig);
  }

  const details = el('div', 'ss-details');

  const finCard = el('section', 'ss-card');
  finCard.append(el('h4', 'ss-card-title', tr.t('sheetFinishes')));
  const finList = el('ul', 'ss-fin-list');
  for (const f of model.finishes) {
    const li = el('li', 'ss-fin-item');
    const sw = el('span', 'ss-swatch');
    sw.style.backgroundColor = f.swatch;
    const textWrap = el('div', 'ss-fin-text');
    const nameRow = el('strong', null, f.label);
    const valText = f.tint ? `${f.presetName} (${tr.t('sheetCustomTint')}: ${f.tint})` : f.presetName;
    const valRow = el('span', null, valText);
    textWrap.append(nameRow, valRow);
    li.append(sw, textWrap);
    finList.append(li);
  }
  finCard.append(finList);

  const optCard = el('section', 'ss-card');
  optCard.append(el('h4', 'ss-card-title', tr.t('sheetOptions')));
  const optList = el('ul', 'ss-opt-list');
  for (const opt of model.options) {
    const li = el('li', 'ss-opt-item');
    li.append(el('span', 'ss-opt-k', opt.label), el('strong', 'ss-opt-v', opt.value));
    optList.append(li);
  }
  if (model.ledKelvin) {
    const li = el('li', 'ss-opt-item');
    li.append(el('span', 'ss-opt-k', tr.t('ledTempLabel')), el('strong', 'ss-opt-v ss-ltr', model.ledKelvin));
    optList.append(li);
  }
  const bgLi = el('li', 'ss-opt-item');
  bgLi.append(
    el('span', 'ss-opt-k', tr.t('backdropMode')),
    el('strong', 'ss-opt-v', tr.t(model.backdropMode === 'room' ? 'backdropRoom' : 'backdropStudio'))
  );
  optList.append(bgLi);
  optCard.append(optList);

  const noteCard = el('section', 'ss-card');
  noteCard.append(
    el('h4', 'ss-card-title', tr.t('sheetNotes')),
    el('p', 'ss-note-body', model.notesText),
    el('p', 'ss-disclaimer', model.disclaimer)
  );

  details.append(finCard, optCard, noteCard);
  sheet.append(head, grid, details);
  container.append(sheet);
}

function loadImage(src) {
  return new Promise(resolve => {
    if (typeof src !== 'string' || !src.startsWith('data:image/')) { resolve(null); return; }
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export async function composeSpecSheetPng(model, views, tr) {
  const W = 2400;
  const H = 1700;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f6f3ec';
  ctx.fillRect(0, 0, W, H);

  const margin = 56;
  const rtl = model.rtl;

  // Header panel
  const headerH = 152;
  ctx.fillStyle = '#fffdfa';
  drawRoundedRect(ctx, margin, margin, W - margin * 2, headerH, 16);
  ctx.fill();
  ctx.strokeStyle = '#dad7cb';
  ctx.lineWidth = 2;
  ctx.stroke();

  let brandTextOffset = 0;
  if (model.logo) {
    const logoImg = await loadImage(model.logo);
    if (logoImg) {
      const natW = logoImg.naturalWidth || 160;
      const natH = logoImg.naturalHeight || 64;
      const ratio = Math.min(200 / natW, 88 / natH);
      const dw = Math.max(1, Math.round(natW * ratio));
      const dh = Math.max(1, Math.round(natH * ratio));
      const lx = rtl ? W - margin - 28 - dw : margin + 28;
      const ly = margin + Math.round((headerH - dh) * 0.5);
      ctx.drawImage(logoImg, lx, ly, dw, dh);
      brandTextOffset = dw + 24;
    }
  }

  const titleX = rtl ? W - margin - 28 - brandTextOffset : margin + 28 + brandTextOffset;
  const metaX = rtl ? margin + 28 : W - margin - 28;
  ctx.textAlign = rtl ? 'right' : 'left';

  ctx.fillStyle = '#244e3c';
  ctx.font = '600 18px system-ui, -apple-system, sans-serif';
  ctx.textBaseline = 'top';
  const brandLine = model.businessDesc ? `${model.businessName} · ${model.businessDesc}` : model.businessName;
  ctx.fillText(brandLine, titleX, margin + 22, 1300);

  ctx.fillStyle = '#1f231e';
  ctx.font = '600 40px Georgia, "Times New Roman", serif';
  ctx.fillText(model.modelName, titleX, margin + 52, 1320);

  ctx.fillStyle = '#5c6459';
  ctx.font = '400 20px system-ui, -apple-system, sans-serif';
  ctx.fillText(model.description, titleX, margin + 106, 1320);

  ctx.textAlign = rtl ? 'left' : 'right';
  ctx.fillStyle = '#5c6459';
  ctx.font = '600 16px system-ui, -apple-system, sans-serif';
  ctx.fillText(tr.t('sheetDimensions'), metaX, margin + 28);
  ctx.fillStyle = '#1f231e';
  ctx.font = '700 26px ui-monospace, SFMono-Regular, Consolas, monospace';
  ctx.fillText(model.dimensionsText, metaX, margin + 52);

  ctx.fillStyle = '#5c6459';
  ctx.font = '500 18px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${tr.t('sheetDate')}: ${model.dateText}`, metaX, margin + 96);

  // 2x2 View grid
  const gridTop = margin + headerH + 28;
  const gap = 24;
  const colW = (W - margin * 2 - gap) / 2;
  const rowH = 528;
  const capH = 44;

  const tiles = [
    { key: 'studio', label: tr.t('sheetViewStudio'), col: rtl ? 1 : 0, row: 0 },
    { key: 'front', label: tr.t('sheetViewFront'), col: rtl ? 0 : 1, row: 0 },
    { key: 'side', label: tr.t('sheetViewSide'), col: rtl ? 1 : 0, row: 1 },
    { key: 'interior', label: tr.t('sheetViewInterior'), col: rtl ? 0 : 1, row: 1 }
  ];

  const loadedViews = await Promise.all(tiles.map(t => loadImage(views[t.key])));
  tiles.forEach((tile, idx) => {
    const x = margin + tile.col * (colW + gap);
    const y = gridTop + tile.row * (rowH + gap);
    ctx.fillStyle = '#fffdfa';
    drawRoundedRect(ctx, x, y, colW, rowH, 14);
    ctx.fill();
    ctx.strokeStyle = '#dad7cb';
    ctx.lineWidth = 2;
    ctx.stroke();

    const img = loadedViews[idx];
    if (img) {
      const innerH = rowH - capH - 4;
      const innerW = colW - 4;
      const scale = Math.min(innerW / img.width, innerH / img.height);
      const dw = Math.round(img.width * scale);
      const dh = Math.round(img.height * scale);
      const ix = x + 2 + Math.round((innerW - dw) * 0.5);
      const iy = y + 2 + Math.round((innerH - dh) * 0.5);
      ctx.save();
      drawRoundedRect(ctx, x + 2, y + 2, innerW, innerH, 12);
      ctx.clip();
      ctx.drawImage(img, ix, iy, dw, dh);
      ctx.restore();
    }

    ctx.fillStyle = '#eae6dc';
    ctx.fillRect(x + 2, y + rowH - capH, colW - 4, 1);
    ctx.fillStyle = '#252923';
    ctx.font = '600 18px system-ui, -apple-system, sans-serif';
    ctx.textAlign = rtl ? 'right' : 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(tile.label, rtl ? x + colW - 22 : x + 22, y + rowH - capH * 0.5);
  });

  // Footer details cards
  const detTop = gridTop + rowH * 2 + gap * 2;
  const detH = H - margin - detTop;
  const cardW = (W - margin * 2 - gap * 2) / 3;
  const drawCard = (idx, titleText) => {
    const visualIdx = rtl ? 2 - idx : idx;
    const x = margin + visualIdx * (cardW + gap);
    ctx.fillStyle = '#fffdfa';
    drawRoundedRect(ctx, x, detTop, cardW, detH, 14);
    ctx.fill();
    ctx.strokeStyle = '#dad7cb';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#244e3c';
    ctx.font = '700 18px system-ui, -apple-system, sans-serif';
    ctx.textAlign = rtl ? 'right' : 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(titleText, rtl ? x + cardW - 24 : x + 24, detTop + 20, cardW - 48);
    return x;
  };

  // Finishes card
  const finX = drawCard(0, tr.t('sheetFinishes'));
  model.finishes.slice(0, 6).forEach((f, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cellW = (cardW - 56) / 2;
    const cx = rtl ? finX + cardW - 24 - col * (cellW + 8) : finX + 24 + col * (cellW + 8);
    const cy = detTop + 56 + row * 72;
    const swSize = 32;
    const sx = rtl ? cx - swSize : cx;
    ctx.fillStyle = f.swatch;
    drawRoundedRect(ctx, sx, cy + 4, swSize, swSize, 6);
    ctx.fill();
    ctx.strokeStyle = '#b9b4a7';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const tx = rtl ? sx - 12 : sx + swSize + 12;
    ctx.textAlign = rtl ? 'right' : 'left';
    ctx.fillStyle = '#1f231e';
    ctx.font = '600 17px system-ui, -apple-system, sans-serif';
    ctx.fillText(f.label, tx, cy + 2, cellW - swSize - 16);
    ctx.fillStyle = '#5c6459';
    ctx.font = '400 15px system-ui, -apple-system, sans-serif';
    ctx.fillText(f.tint ? `${f.presetName} (${f.tint})` : f.presetName, tx, cy + 24, cellW - swSize - 16);
  });

  // Options card
  const optX = drawCard(1, tr.t('sheetOptions'));
  const optLines = [
    ...model.options.map(o => `${o.label}: ${o.value}`),
    ...(model.ledKelvin ? [`${tr.t('ledTempLabel')}: ${model.ledKelvin}`] : []),
    `${tr.t('backdropMode')}: ${tr.t(model.backdropMode === 'room' ? 'backdropRoom' : 'backdropStudio')}`
  ];
  optLines.slice(0, 6).forEach((line, idx) => {
    ctx.fillStyle = '#252923';
    ctx.font = '500 17px system-ui, -apple-system, sans-serif';
    ctx.textAlign = rtl ? 'right' : 'left';
    ctx.fillText(line, rtl ? optX + cardW - 24 : optX + 24, detTop + 58 + idx * 34, cardW - 48);
  });

  // Notes card
  const noteX = drawCard(2, tr.t('sheetNotes'));
  ctx.textAlign = rtl ? 'right' : 'left';
  ctx.fillStyle = '#474f45';
  ctx.font = '400 17px system-ui, -apple-system, sans-serif';
  const words = model.notesText.split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    if (ctx.measureText(candidate).width > cardW - 48 && current) {
      lines.push(current);
      current = w;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  lines.slice(0, 4).forEach((line, idx) => {
    ctx.fillText(line, rtl ? noteX + cardW - 24 : noteX + 24, detTop + 58 + idx * 28, cardW - 48);
  });

  ctx.fillStyle = '#6f776c';
  ctx.font = '600 15px system-ui, -apple-system, sans-serif';
  ctx.fillText(model.disclaimer, rtl ? noteX + cardW - 24 : noteX + 24, detTop + detH - 36, cardW - 48);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Failed to encode spec sheet board PNG.'))), 'image/png');
  });
  return { blob, width: W, height: H };
}
