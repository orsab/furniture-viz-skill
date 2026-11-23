const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const SURFACES = new Set(['wood', 'fabric', 'metal', 'paint']);

export const MATERIAL_CATALOG = [
  // Wood
  { id: 'natural-oak', name: 'Natural oak', heName: 'אלון טבעי', color: '#c29b70', surface: 'wood', aliases: ['natural oak', 'oak', 'whitewash oak', 'אלון טבעי', 'אלון', 'עץ אלון'] },
  { id: 'white-oak', name: 'White oak', heName: 'אלון מולבן', color: '#d4bc98', surface: 'wood', aliases: ['white oak', 'light oak', 'bleach oak', 'אלון מולבן', 'אלון בהיר'] },
  { id: 'fluted-oak', name: 'Fluted oak', heName: 'אלון מחורץ', color: '#bfa078', surface: 'wood', aliases: ['fluted oak', 'slatted oak', 'reeded oak', 'אלון מחורץ', 'חיפוי סרגלים', 'סרגלי אלון'] },
  { id: 'smoked-walnut', name: 'Smoked walnut', heName: 'אגוז מעושן', color: '#72533d', surface: 'wood', aliases: ['smoked walnut', 'dark walnut', 'walnut', 'אגוז מעושן', 'אגוז כהה', 'עץ אגוז', 'אגוז'] },
  { id: 'american-walnut', name: 'American walnut', heName: 'אגוז אמריקאי', color: '#745746', surface: 'wood', aliases: ['american walnut', 'oberflex', 'אגוז אמריקאי'] },
  { id: 'ash', name: 'Ash veneer', heName: 'מילה (אש)', color: '#ddd2bd', surface: 'wood', aliases: ['ash', 'ash wood', 'ash veneer', 'מילה', 'פורניר מילה', 'אש'] },
  { id: 'beech', name: 'Steamed beech', heName: 'בוק טבעי', color: '#cfa97f', surface: 'wood', aliases: ['beech', 'steamed beech', 'בוק', 'עץ בוק'] },
  { id: 'teak', name: 'Teak', heName: 'טיק', color: '#9e6b43', surface: 'wood', aliases: ['teak', 'burmese teak', 'טיק', 'עץ טיק'] },
  { id: 'maple', name: 'Hard maple', heName: 'מייפל בהיר', color: '#dfd0b4', surface: 'wood', aliases: ['maple', 'hard maple', 'מייפל'] },
  { id: 'birch', name: 'Birch plywood', heName: 'ליבנה (בירץ׳)', color: '#e4d7bd', surface: 'wood', aliases: ['birch', 'birch ply', 'plywood', 'בירץ', 'ליבנה', 'לביד ליבנה'] },
  { id: 'pine', name: 'Natural pine', heName: 'אורן טבעי', color: '#dab985', surface: 'wood', aliases: ['pine', 'nordic pine', 'אורן', 'עץ אורן'] },
  { id: 'wenge', name: 'Wenge', heName: 'וונגה', color: '#3d2e26', surface: 'wood', aliases: ['wenge', 'espresso wood', 'וונגה', 'אספרסו'] },

  // Paint / Laminate / Stone-look matte
  { id: 'cashmere', name: 'Matte cashmere', heName: 'קשמיר מט', color: '#c9bdab', surface: 'paint', aliases: ['cashmere', 'egger u702', 'u702', 'קשמיר', 'קשמיר מט', 'קשמיר אגר'] },
  { id: 'chalk', name: 'Chalk matte', heName: 'גיר מט', color: '#dedbd0', surface: 'paint', aliases: ['chalk', 'chalk white', 'גיר', 'לבן גיר'] },
  { id: 'warm-white', name: 'Warm white', heName: 'לבן חמים', color: '#f1ede4', surface: 'paint', aliases: ['warm white', 'off white', 'off-white', 'ral 9010', 'לבן חמים', 'לבן שבור'] },
  { id: 'ivory', name: 'Ivory lacquer', heName: 'שמנת מט', color: '#f5f0e6', surface: 'paint', aliases: ['ivory', 'cream', 'lacquer white', 'שמנת', 'לכה שמנת', 'שנהב'] },
  { id: 'sand', name: 'Desert sand', heName: 'חול בהיר', color: '#d9cdb8', surface: 'paint', aliases: ['sand', 'beige', 'oat', 'חול', 'בז', 'בז׳'] },
  { id: 'taupe', name: 'Warm taupe', heName: 'טאופ חמים', color: '#9e9386', surface: 'paint', aliases: ['taupe', 'warm taupe', 'טאופ'] },
  { id: 'greige', name: 'Greige matte', heName: 'גרייז׳ מט', color: '#b8afa3', surface: 'paint', aliases: ['greige', 'warm grey', 'warm gray', 'גרייז', 'גרייז׳', 'אפור חמים'] },
  { id: 'sage', name: 'Soft sage', heName: 'ירוק מרווה', color: '#8d9c89', surface: 'paint', aliases: ['sage', 'sage green', 'eucalyptus', 'מרווה', 'ירוק מרווה'] },
  { id: 'moss', name: 'Moss green', heName: 'ירוק טחב', color: '#6a7666', surface: 'paint', aliases: ['moss', 'moss green', 'forest green', 'טחב', 'ירוק טחב'] },
  { id: 'olive', name: 'Muted olive', heName: 'ירוק זית', color: '#6b7054', surface: 'paint', aliases: ['olive', 'olive green', 'זית', 'ירוק זית'] },
  { id: 'clay', name: 'Baked clay', heName: 'חימר', color: '#b77c62', surface: 'paint', aliases: ['clay', 'חימר'] },
  { id: 'terracotta', name: 'Terracotta', heName: 'טרקוטה', color: '#b86348', surface: 'paint', aliases: ['terracotta', 'sienna', 'טרקוטה'] },
  { id: 'navy', name: 'Deep navy', heName: 'כחול נייבי', color: '#2d3b4e', surface: 'paint', aliases: ['navy', 'midnight blue', 'ink blue', 'נייבי', 'כחול כהה'] },
  { id: 'slate', name: 'Slate blue-grey', heName: 'אפור צפחה', color: '#5a646e', surface: 'paint', aliases: ['slate', 'slate grey', 'slate gray', 'צפחה', 'אפור כחול'] },
  { id: 'charcoal', name: 'Charcoal matte', heName: 'פחם מט', color: '#414548', surface: 'paint', aliases: ['charcoal', 'anthracite', 'פחם', 'אנתרציט', 'אפור כהה'] },
  { id: 'graphite', name: 'Graphite', heName: 'גרפיט', color: '#464642', surface: 'paint', aliases: ['graphite', 'גרפיט'] },
  { id: 'matte-black', name: 'Matte black', heName: 'שחור מט', color: '#222426', surface: 'paint', aliases: ['matte black', 'black', 'ral 9005', 'שחור מט', 'שחור'] },
  { id: 'marble', name: 'Honed marble', heName: 'שיש בהיר', color: '#eceae4', surface: 'paint', aliases: ['marble', 'carrara', 'calacatta', 'שיש', 'קרארה'] },
  { id: 'travertine', name: 'Warm travertine', heName: 'טרוורטין', color: '#d6cbb9', surface: 'paint', aliases: ['travertine', 'limestone', 'טרוורטין', 'אבן טרוורטין'] },
  { id: 'dekton', name: 'Porcelain / Dekton', heName: 'גרניט פורצלן / דקטון', color: '#a39478', surface: 'paint', aliases: ['dekton', 'porcelain', 'caesarstone', 'קלילו', 'דקטון', 'גרניט פורצלן', 'אבן קיסר'] },
  { id: 'concrete', name: 'Microcement', heName: 'בטון מוחלק', color: '#9d9d9a', surface: 'paint', aliases: ['concrete', 'microcement', 'מיקרוצמנט', 'בטון מוחלק', 'בטון'] },
  { id: 'terrazzo', name: 'Light terrazzo', heName: 'טראצו בהיר', color: '#d5d1c8', surface: 'paint', aliases: ['terrazzo', 'טראצו'] },

  // Metal
  { id: 'brushed-brass', name: 'Brushed brass', heName: 'פליז מוברש', color: '#b49963', surface: 'metal', aliases: ['brushed brass', 'brass', 'gold brass', 'פליז מוברש', 'פליז', 'זהב מוברש'] },
  { id: 'aged-brass', name: 'Dark brushed brass', heName: 'פליז כהה / מיושן', color: '#93734a', surface: 'metal', aliases: ['aged brass', 'antique brass', 'dark brass', 'פליז מיושן', 'פליז כהה'] },
  { id: 'brushed-bronze', name: 'Brushed bronze', heName: 'ברונזה מוברשת', color: '#8d724e', surface: 'metal', aliases: ['brushed bronze', 'bronze', 'dark bronze', 'ברונזה מוברשת', 'ברונזה'] },
  { id: 'champagne', name: 'Champagne metal', heName: 'שמפניה מוברשת', color: '#cbb799', surface: 'metal', aliases: ['champagne', 'champagne metal', 'שמפניה'] },
  { id: 'satin-nickel', name: 'Satin nickel', heName: 'ניקל סאטן', color: '#b8bdbe', surface: 'metal', aliases: ['satin nickel', 'brushed nickel', 'nickel', 'ניקל סאטן', 'ניקל'] },
  { id: 'chrome', name: 'Polished chrome', heName: 'כרום מבריק', color: '#cfd4d6', surface: 'metal', aliases: ['chrome', 'polished chrome', 'כרום'] },
  { id: 'stainless', name: 'Brushed stainless', heName: 'נירוסטה מוברשת', color: '#b5b9bc', surface: 'metal', aliases: ['stainless', 'stainless steel', 'inox', 'steel', 'נירוסטה', 'פלדה'] },
  { id: 'copper', name: 'Brushed copper', heName: 'נחושת מוברשת', color: '#b87352', surface: 'metal', aliases: ['copper', 'rose gold', 'נחושת'] },
  { id: 'black-metal', name: 'Matte black steel', heName: 'ברזל שחור מט', color: '#282a2c', surface: 'metal', aliases: ['black steel', 'black metal', 'black iron', 'powder coated black', 'ברזל שחור', 'מתכת שחורה'] },
  { id: 'aluminum', name: 'Anodized aluminum', heName: 'אלומיניום טבעי', color: '#a5abb0', surface: 'metal', aliases: ['aluminum', 'aluminium', 'anodized', 'אלומיניום'] },
  { id: 'mirror', name: 'Mirror glass', heName: 'מראה', color: '#dfe4e5', surface: 'metal', aliases: ['mirror', 'mirrored', 'מראה', 'זכוכית מראה'] },

  // Fabric / Upholstery / Woven
  { id: 'linen', name: 'Woven linen', heName: 'פשתן טבעי', color: '#c9bfa9', surface: 'fabric', aliases: ['linen', 'flax', 'פשתן', 'אריג פשתן'] },
  { id: 'egger-f416', name: 'Fabric effect linen', heName: 'אפקט בד פשתן', color: '#b8a992', surface: 'fabric', aliases: ['f416', 'egger f416', 'fabric effect', 'פשתן גוף'] },
  { id: 'boucle', name: 'Cream boucle', heName: 'בד בוקלה', color: '#ebe5da', surface: 'fabric', aliases: ['boucle', 'bouclé', 'בוקלה', 'בד בוקלה'] },
  { id: 'velvet', name: 'Soft velvet', heName: 'קטיפה', color: '#687370', surface: 'fabric', aliases: ['velvet', 'קטיפה'] },
  { id: 'cotton', name: 'Woven cotton', heName: 'כותנה ארוגה', color: '#d8d1c5', surface: 'fabric', aliases: ['cotton', 'canvas', 'upholstery', 'בד', 'כותנה', 'ריפוד'] },
  { id: 'wool', name: 'Wool felt', heName: 'לבד צמר', color: '#8c8982', surface: 'fabric', aliases: ['wool', 'felt', 'צמר', 'לבד'] },
  { id: 'leather', name: 'Espresso leather', heName: 'עור חום כהה', color: '#6e4730', surface: 'fabric', aliases: ['leather', 'saddle leather', 'עור', 'עור חום'] },
  { id: 'cognac', name: 'Cognac leather', heName: 'עור קוניאק', color: '#9e5b34', surface: 'fabric', aliases: ['cognac', 'tan leather', 'קוניאק', 'עור קוניאק'] },
  { id: 'suede', name: 'Soft suede', heName: 'זמש', color: '#9e846c', surface: 'fabric', aliases: ['suede', 'nubuck', 'זמש', 'נובוק'] },
  { id: 'rattan', name: 'Woven rattan', heName: 'ראטן קלוע', color: '#b59264', surface: 'fabric', aliases: ['rattan', 'wicker', 'ראטן', 'קש קלוע'] },
  { id: 'cane', name: 'Vienna cane', heName: 'קש וינאי', color: '#c8a878', surface: 'fabric', aliases: ['cane', 'viennese cane', 'קש וינאי', 'קש'] }
];

const FALLBACK_COLORS = [
  { re: /\b(?:white|snow|chalk|alabaster)\b|לבן/i, color: '#f1ede4' },
  { re: /\b(?:cream|ivory|vanilla|off-white)\b|שמנת/i, color: '#f4efe6' },
  { re: /\b(?:beige|sand|oat|wheat|linen|tan)\b|בז|חול/i, color: '#d8cbb5' },
  { re: /\b(?:brown|chocolate|espresso|cocoa|coffee|walnut)\b|חום/i, color: '#6f513d' },
  { re: /\b(?:grey|gray|silver|ash|pebble)\b|אפור|כסף/i, color: '#8b8f91' },
  { re: /\b(?:charcoal|graphite|anthracite)\b|פחם|גרפיט/i, color: '#424547' },
  { re: /\b(?:black|onyx|ebony)\b|שחור/i, color: '#242628' },
  { re: /\b(?:green|sage|moss|olive|forest)\b|ירוק/i, color: '#6e7e6b' },
  { re: /\b(?:blue|navy|indigo|teal|petrol)\b|כחול|תכלת|טורקיז/i, color: '#394f68' },
  { re: /\b(?:red|burgundy|wine|rust|terracotta)\b|אדום|בורדו|חמרה/i, color: '#9c4b3c' },
  { re: /\b(?:yellow|ochre|mustard|gold)\b|צהוב|חרדל|זהב/i, color: '#c49b4f' }
];

const SLOT_SYNONYMS = [
  { key: 'front', pattern: /fronts?|doors?|drawer|חזית|חזיתות|דלת|דלתות|מגיר/i },
  { key: 'case', pattern: /case|body|carcass|frame|shell|גוף|שלד|ארגז|מסגרת/i },
  { key: 'hardware', pattern: /hardware|handles?|pulls?|knobs?|hinges?|rails?|פרזול|ידיות|ידית|צירים|מתלה/i },
  { key: 'top', pattern: /top|counter|countertop|surface|basin|sink|משטח|פלטה|שיש|כיור/i },
  { key: 'base', pattern: /base|plinth|legs?|feet|רגל|רגליים|בסיס|צוקל/i }
];

function matchSlotPrefix(prefix, existingSlots) {
  if (!existingSlots?.length || !prefix) return null;
  const norm = prefix.trim().toLowerCase();
  if (!norm) return null;
  for (const s of existingSlots) {
    if (s.id.toLowerCase() === norm || (s.label && s.label.toLowerCase() === norm)) return s.id;
  }
  for (const s of existingSlots) {
    if ((s.label && s.label.toLowerCase().includes(norm)) || norm.includes(s.id.toLowerCase())) return s.id;
  }
  for (const group of SLOT_SYNONYMS) {
    if (!group.pattern.test(norm)) continue;
    const hit = existingSlots.find(s => group.pattern.test(`${s.id} ${s.label || ''}`));
    if (hit) return hit.id;
  }
  return null;
}

function normalizeHex(raw) {
  const m3 = /^#([\da-f])([\da-f])([\da-f])$/i.exec(raw.trim());
  if (m3) return `#${m3[1]}${m3[1]}${m3[2]}${m3[2]}${m3[3]}${m3[3]}`.toLowerCase();
  const m6 = /^#([\da-f]{6})$/i.exec(raw.trim());
  return m6 ? `#${m6[1].toLowerCase()}` : null;
}

const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const BOUNDARY_START = '(?:^|[\\s,.;:/\\-()"\'׳״])';
const BOUNDARY_END = '(?=$|[\\s,.;:/\\-()"\'׳״])';

function matchWordPattern(phrase, patternBody) {
  return new RegExp(`${BOUNDARY_START}(?:${patternBody})${BOUNDARY_END}`, 'i').test(phrase);
}

function detectSurfaceKeyword(phrase) {
  if (matchWordPattern(phrase, 'wood|veneer|timber|oak|walnut|ash|beech|teak|maple|birch|pine|wenge|[המב]?(?:עץ|פורניר|אלון|אגוז|ליבנה|מייפל|אורן|טיק|וונגה)|בוק')) return 'wood';
  if (matchWordPattern(phrase, 'metal|brass|bronze|steel|chrome|nickel|iron|copper|alumin(?:um|ium)|inox|mirror|[המב]?(?:מתכת|פליז|ברונזה|ברזל|נירוסטה|כרום|ניקל|נחושת|אלומיניום|מראה)')) return 'metal';
  if (matchWordPattern(phrase, 'fabric|textile|cloth|boucl[eé]|linen|velvet|leather|suede|cotton|wool|felt|rattan|cane|upholstery|[המב]?(?:ריפוד|אריג|פשתן|בוקלה|קטיפה|עור|זמש|ראטן)|בד|קש')) return 'fabric';
  if (matchWordPattern(phrase, 'paint|lacquer|matte|satin|laminate|melamine|formica|stone|marble|travertine|dekton|porcelain|concrete|terrazzo|[המב]?(?:צבע|לכה|פורמייקה|מלמין|שיש|אבן|בטון)|לק|מט')) return 'paint';
  return null;
}

function matchCatalogAlias(phrase) {
  let best = null;
  let bestLen = 0;
  for (const item of MATERIAL_CATALOG) {
    for (const alias of item.aliases) {
      if (new RegExp(`${BOUNDARY_START}${escapeRe(alias)}${BOUNDARY_END}`, 'i').test(phrase) && alias.length > bestLen) {
        best = item;
        bestLen = alias.length;
      }
    }
  }
  return best;
}

export function parseMaterialsFromText(text, { existingSlots = [] } = {}) {
  if (typeof text !== 'string' || !text.trim()) return [];
  const results = [];
  const seen = new Set();

  const lines = text.split(/[\r\n;]+/);
  for (const rawLine of lines) {
    let chunk = rawLine.replace(/^\s*[-*•\d.)]+\s*/, '').trim();
    if (!chunk) continue;

    let slotId = null;
    const colonIdx = chunk.indexOf(':');
    if (colonIdx > 0 && colonIdx < 48 && !/^https?$/i.test(chunk.slice(0, colonIdx))) {
      const candidatePrefix = chunk.slice(0, colonIdx).trim();
      const matched = matchSlotPrefix(candidatePrefix, existingSlots);
      if (matched) {
        slotId = matched;
        chunk = chunk.slice(colonIdx + 1).trim();
      }
    }

    const parts = chunk.split(/[,،]+/);
    for (const rawPart of parts) {
      const cleaned = rawPart.trim();
      if (!cleaned) continue;

      const hexMatch = /#(?:[\da-f]{6}|[\da-f]{3})\b/i.exec(cleaned);
      const inlineHex = hexMatch ? normalizeHex(hexMatch[0]) : null;
      const surfaceHint = detectSurfaceKeyword(cleaned);
      const cat = matchCatalogAlias(cleaned);
      const fallbackColor = FALLBACK_COLORS.find(f => f.re.test(cleaned))?.color ?? null;

      if (!cat && !inlineHex && !fallbackColor && !surfaceHint) continue;

      const surface = surfaceHint || cat?.surface || 'paint';
      const color = inlineHex || cat?.color || fallbackColor || '#b8b2a6';

      let name = cleaned.replace(/#(?:[\da-f]{6}|[\da-f]{3})\b/gi, '').replace(/\s+/g, ' ').replace(/^[\s\-–·]+|[\s\-–·]+$/g, '').trim();
      if (!name) name = cat?.name || color.toUpperCase();
      if (name.length > 120) name = name.slice(0, 120).trim();

      const key = `${slotId ?? ''}|${name.toLowerCase()}|${color}`;
      if (seen.has(key)) continue;
      seen.add(key);
      results.push({ name, color, surface, slotId });
    }
  }
  return results;
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('')}`;
}

function rgbDistance(a, b) {
  const rMean = (a[0] + b[0]) * 0.5;
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(((2 + rMean / 256) * dr * dr) + (4 * dg * dg) + ((2 + (255 - rMean) / 256) * db * db)) / 1.732;
}

export function extractPaletteFromRgba(rgba, width, height, { maxColors = 6, surface = 'paint', lang = 'en' } = {}) {
  if (!rgba || !width || !height) return [];
  const kTarget = clamp(Math.round(maxColors), 1, 12);
  const chosenSurface = SURFACES.has(surface) ? surface : 'paint';
  const totalPixels = width * height;
  const stride = Math.max(1, Math.floor(Math.sqrt(totalPixels / 3600)));

  const foreground = [];
  const darkInk = [];
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      const i = (y * width + x) * 4;
      const a = rgba[i + 3];
      if (a < 160) continue;
      const r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const maxC = Math.max(r, g, b), minC = Math.min(r, g, b);
      const sat = maxC ? (maxC - minC) / maxC : 0;
      if (luma > 246 && sat < 0.06) continue; // White sketch paper background
      if (luma < 26 && sat < 0.08) darkInk.push([r, g, b]);
      else foreground.push([r, g, b]);
    }
  }

  const samples = foreground.length >= Math.max(12, Math.floor(darkInk.length * 0.35))
    ? foreground
    : [...foreground, ...darkInk];
  if (!samples.length) return [];

  // Deterministic farthest-point initialization for reproducible clusters.
  const k = Math.min(kTarget, samples.length);
  const centers = [samples[0].slice()];
  while (centers.length < k) {
    let bestPt = samples[0];
    let bestDist = -1;
    for (const p of samples) {
      let minD = Infinity;
      for (const c of centers) {
        const dr = p[0] - c[0], dg = p[1] - c[1], db = p[2] - c[2];
        const d = dr * dr + dg * dg + db * db;
        if (d < minD) minD = d;
      }
      if (minD > bestDist) {
        bestDist = minD;
        bestPt = p;
      }
    }
    if (bestDist < 1) break;
    centers.push(bestPt.slice());
  }

  const assignments = new Int32Array(samples.length);
  const actualK = centers.length;
  for (let iter = 0; iter < 12; iter++) {
    const sumR = new Float64Array(actualK);
    const sumG = new Float64Array(actualK);
    const sumB = new Float64Array(actualK);
    const counts = new Int32Array(actualK);
    for (let i = 0; i < samples.length; i++) {
      const p = samples[i];
      let bestC = 0, bestD = Infinity;
      for (let c = 0; c < actualK; c++) {
        const cen = centers[c];
        const dr = p[0] - cen[0], dg = p[1] - cen[1], db = p[2] - cen[2];
        const d = dr * dr + dg * dg + db * db;
        if (d < bestD) { bestD = d; bestC = c; }
      }
      assignments[i] = bestC;
      sumR[bestC] += p[0];
      sumG[bestC] += p[1];
      sumB[bestC] += p[2];
      counts[bestC]++;
    }
    for (let c = 0; c < actualK; c++) {
      if (counts[c] > 0) {
        centers[c][0] = sumR[c] / counts[c];
        centers[c][1] = sumG[c] / counts[c];
        centers[c][2] = sumB[c] / counts[c];
      }
    }
  }

  const finalCounts = new Int32Array(actualK);
  for (let i = 0; i < samples.length; i++) finalCounts[assignments[i]]++;

  const clusters = centers
    .map((rgb, idx) => ({ rgb, count: finalCounts[idx] }))
    .filter(c => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const merged = [];
  for (const c of clusters) {
    const dup = merged.find(m => rgbDistance(m.rgb, c.rgb) < 20);
    if (dup) dup.count += c.count;
    else merged.push({ rgb: c.rgb.slice(), count: c.count });
  }

  const usedNames = new Set();
  return merged.slice(0, kTarget).map((c, idx) => {
    const hex = rgbToHex(c.rgb[0], c.rgb[1], c.rgb[2]);
    let closestCat = null;
    let minCatDist = 42;
    for (const item of MATERIAL_CATALOG) {
      const d = rgbDistance(c.rgb, hexToRgb(item.color));
      if (d < minCatDist) { minCatDist = d; closestCat = item; }
    }
    const baseName = closestCat
      ? (lang === 'he' ? closestCat.heName : closestCat.name)
      : (lang === 'he' ? `גוון סקיצה ${idx + 1}` : `Sketch swatch ${idx + 1}`);
    let name = baseName;
    if (usedNames.has(name.toLowerCase())) name = `${baseName} (${hex.toUpperCase()})`;
    usedNames.add(name.toLowerCase());
    return {
      name,
      color: hex,
      surface: chosenSurface,
      slotId: null,
      coverage: Math.round((c.count / samples.length) * 1000) / 1000
    };
  });
}

export function applyMaterialsToSpec(spec, entries, { targetSlot = null, replace = false, source = 'materials-input', status = 'stated' } = {}) {
  const nextSpec = structuredClone(spec);
  if (!nextSpec?.slots?.length) throw new Error('Spec defines no finish slots.');
  const slotMap = new Map(nextSpec.slots.map(s => [s.id, s]));
  const defaultSlot = targetSlot && slotMap.has(targetSlot) ? targetSlot : nextSpec.slots[0].id;
  if (targetSlot && !slotMap.has(targetSlot)) throw new Error(`Unknown finish slot: ${targetSlot}`);

  const grouped = new Map();
  for (const entry of entries || []) {
    const sid = entry.slotId && slotMap.has(entry.slotId) ? entry.slotId : defaultSlot;
    const list = grouped.get(sid) || [];
    list.push(entry);
    grouped.set(sid, list);
  }

  const evStatus = status === 'estimated' ? 'estimated' : 'stated';
  const applied = [];

  for (const [sid, list] of grouped.entries()) {
    const slot = slotMap.get(sid);
    const nextFinishes = replace ? [] : [...slot.finishes];
    const addedNames = [];
    for (const item of list) {
      const color = normalizeHex(item.color) || '#b8b2a6';
      const surface = SURFACES.has(item.surface) ? item.surface : 'paint';
      let name = String(item.name || color.toUpperCase()).trim().slice(0, 120);
      if (!name) name = color.toUpperCase();
      const dup = nextFinishes.find(
        f => f.name.toLowerCase() === name.toLowerCase() || (f.color.toLowerCase() === color && f.surface === surface)
      );
      if (dup) continue;
      if (nextFinishes.length >= 64) break;
      nextFinishes.push({ name, color, surface });
      addedNames.push(`${name} (${color}, ${surface})`);
    }
    if (nextFinishes.length) {
      slot.finishes = nextFinishes;
      if (addedNames.length) {
        applied.push({ slotId: sid, count: addedNames.length, finishes: addedNames });
        nextSpec.evidence.push({
          field: `slots.${sid}`,
          source: String(source).slice(0, 240) || 'materials-input',
          note: `${replace ? 'Replaced' : 'Added'} selectable finishes from supplied materials: ${addedNames.join('; ')}.`.slice(0, 1000),
          status: evStatus
        });
      }
    }
  }

  return { spec: nextSpec, applied };
}
