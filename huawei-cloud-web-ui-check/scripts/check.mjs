#!/usr/bin/env node
/**
 * huawei-cloud-web-ui-check — 官网 UX 规范静态校验器
 *
 * 用法: node check.mjs <page.html> [-o report.html]
 * 输入: 任意 HTML 页面（解析 <style> 块与 inline style）
 * 输出: 控制台摘要 + HTML 校验报告
 *
 * 校验维度（与 huawei-cloud-web-ui skill 的实测值一一对应）:
 *   R1 色板    —— 只允许调色板 + 插画 12 色（tokens/colors.md）
 *   R2 字阶    —— 只允许 16 档字号（tokens/typography.md）
 *   R3 圆角    —— token 档位 0/2/4/6/8/12/16/24/32/48/50%/100px；按钮恒 24 胶囊
 *   R4 按钮高度 —— 四档 24/32/40/48（components/buttons.md）
 *   R5 按钮底色 —— 主按钮 #191919；深底楼层主按钮 #FFFFFF（components/buttons.md / full-banner.md）
 *   R6 删除线  —— 全库 0 处，禁止 line-through（components/price.md：原价不划线）
 *   R7 间距    —— gap/padding 落 4px 栅格（tokens/spacing.md）
 *   R8 内容区  —— 1200~1700 的显式宽度须为规范内容区 1600/1592/1280/1008
 *   R9 层级    —— z-index 上限 900（tokens/level.md 吸顶层）
 *   R10 字族   —— 首选 HarmonyOS Sans（tokens/typography.md）
 */
import fs from 'node:fs';
import path from 'node:path';

/* ---------------- 规范白名单（来源见各规则 doc 字段） ---------------- */
const PALETTE_HEX = new Set([
  'fff','ffffff','fafafa','f5f5f5','ebebeb','dbdbdb','c2c2c2','adb0b8',
  '595959','808080','333','333333','262626','191919','000','000000',
  'faa9a5','f76360','f23030','f80','ff8800','f7d916','5cb300',
  '1476ff','c7000b','e02128','6ccd06','ffad04','dfe1e6','eee','eeeeee',
]);
const PALETTE_RGB = new Set([
  '0,0,0','255,255,255','25,25,25','89,89,89','51,51,51','38,38,38',
  '242,48,48','199,0,11','20,118,255','108,205,6','255,173,4','224,33,40',
]);
const FONT_SCALE = new Set([10,12,14,16,18,20,24,28,32,36,40,44,48,54,56,60]);
const RADIUS_OK  = new Set(['0','2px','4px','6px','8px','12px','16px','24px','32px','48px','50%','100px','999px','9999px']);
const BTN_HEIGHT = new Set(['24px','32px','40px','48px']);
const BTN_BG_OK  = new Set(['#191919','#ffffff','#fff','transparent','none']);
const FLOOR_CONTENT_WIDTH = new Set(['1008px','1280px','1592px','1600px','1596px','1516px']);
const FONT_FAMILY_OK = /harmony|pingfang|yahei|heiti|helvetica|arial|sans-serif|inherit/i;

/* ---------------- CSS 解析 ---------------- */
function flattenMedia(css) {
  // 把 @media 块拍平成普通规则，保留断点注记
  let out = css, guard = 0;
  while (/@media[^{]+\{/.test(out) && guard++ < 10) {
    out = out.replace(/@media([^{]+)\{/g, (_, bp) => `\n/*__BP__${bp.trim()}__*/\n`);
  }
  return out;
}
function parseCss(css, src) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  css = flattenMedia(css);
  const decls = [];
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let bp = 'all', m;
  const tokens = css.split(/(\/\*__BP__[^*]*__\*\/)/);
  for (const tk of tokens) {
    const bpm = tk.match(/^\/\*__BP__(.+)__\*\/$/);
    if (bpm) { bp = bpm[1].trim(); continue; }
    let r;
    ruleRe.lastIndex = 0;
    while ((r = ruleRe.exec(tk))) {
      const selector = r[1].trim().replace(/\s+/g, ' ');
      if (!selector || selector.startsWith('@')) continue;
      for (const d of r[2].split(';')) {
        const i = d.indexOf(':');
        if (i < 1) continue;
        decls.push({
          prop: d.slice(0, i).trim().toLowerCase(),
          value: d.slice(i + 1).trim().replace(/\s+/g, ' '),
          selector, bp, src,
          line: null,
        });
      }
    }
  }
  return decls;
}
function parseInline(html) {
  const decls = [];
  const tagRe = /<([a-z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
  let m;
  while ((m = tagRe.exec(html))) {
    const attrs = m[2];
    const cls = (attrs.match(/class\s*=\s*"([^"]*)"/i) || [])[1] || '';
    const st  = (attrs.match(/style\s*=\s*"([^"]*)"/i) || [])[1];
    if (!st) continue;
    const line = html.slice(0, m.index).split('\n').length;
    for (const d of st.split(';')) {
      const i = d.indexOf(':');
      if (i < 1) continue;
      decls.push({
        prop: d.slice(0, i).trim().toLowerCase(),
        value: d.slice(i + 1).trim().replace(/\s+/g, ' '),
        selector: `<${m[1]}${cls ? '.' + cls.trim().replace(/\s+/g, '.') : ''}>`,
        bp: 'inline', src: `line ${line}`,
      });
    }
  }
  return decls;
}
function lineOf(html, needle) { // 近似行号
  const i = html.indexOf(needle);
  return i < 0 ? null : html.slice(0, i).split('\n').length;
}

/* ---------------- 规则 ---------------- */
const isBtn = (sel) => /(^|[\s.:#>~])(btn|button|por-btn)/i.test(sel);
const px = (v) => (v.match(/^(-?[\d.]+)px$/) || [])[1];
const num = (v) => (v.match(/^(-?[\d.]+)$/) || [])[1];

const RULES = [
  {
    id: 'R1', level: 'error', title: '色板校验', doc: 'tokens/colors.md',
    desc: '只允许调色板 26 色 + 插画 3 主色；rgba 仅允许黑/白/灰基。',
    test(d) {
      if (!/^(color|background|background-color|border(-top|-right|-bottom|-left)?-color|fill|stroke|box-shadow|outline-color|text-decoration-color|caret-color)$/.test(d.prop) && !/-gradient/.test(d.value) && d.prop !== 'background') return;
      const issues = [];
      const hexes = d.value.match(/#[0-9a-f]{3,8}/gi) || [];
      for (const h of hexes) {
        const hex = h.slice(1).toLowerCase();
        if (!PALETTE_HEX.has(hex) && hex.length <= 6) issues.push(h);
        else if (hex.length === 8) issues.push(h); // 8 位带透明 hex 不在 token 内
      }
      const rgbs = d.value.match(/rgba?\(([\d\s,.]+)\)/gi) || [];
      for (const r of rgbs) {
        const ch = r.replace(/rgba?\(|\)/g, '').split(',').map(s => s.trim());
        if (ch.length < 3) continue;
        const key = `${ch[0]},${ch[1]},${ch[2]}`;
        if (!PALETTE_RGB.has(key) && !/rgba\(\s*var\(/.test(r)) issues.push(r);
      }
      if (issues.length) return `非规范色: ${issues.join(', ')}`;
    },
  },
  {
    id: 'R2', level: 'error', title: '字阶校验', doc: 'tokens/typography.md',
    desc: 'font-size 只允许 16 档: 10/12/14/16/18/20/24/28/32/36/40/44/48/54/56/60。',
    test(d) {
      if (d.prop !== 'font-size') return;
      const p = px(d.value) || num(d.value);
      if (p !== undefined) {
        if (!FONT_SCALE.has(Number(p))) return `字号 ${d.value} 不在 16 档字阶`;
      } else if (!/inherit/.test(d.value)) {
        return `字号使用非常规单位 "${d.value}"（应为 px 档位）`;
      }
    },
  },
  {
    id: 'R3', level: 'error', title: '圆角校验', doc: 'tokens/shadows-radii.md',
    desc: 'token 档位 0/2/4/6/8/12/16/24/32/48/50%/100px；卡片 16 或 24；按钮恒 24（胶囊）。',
    test(d) {
      if (d.prop !== 'border-radius') return;
      const v = d.value;
      if (RADIUS_OK.has(v) || RADIUS_OK.has(v.split(' ')[0])) {
        if (isBtn(d.selector)) {
          const first = v.split(' ')[0];
          if (first !== '24px' && first !== '50%' && first !== '999px' && first !== '9999px' && px(first) !== null && Number(px(first)) < 24)
            return `按钮圆角应为恒 24px（胶囊），实测 ${v}`;
        }
        return;
      }
      const multi = v.split(' ').every(s => RADIUS_OK.has(s));
      if (multi) return;
      if (isBtn(d.selector) && /^\d+px$/.test(v) && Number(px(v)) >= 24) return; // 胶囊兜底
      return `圆角 ${v} 不在 token 档位（0/2/4/6/8/12/16/24/32/48/50%/100px）`;
    },
  },
  {
    id: 'R4', level: 'warn', title: '按钮高度四档', doc: 'components/buttons.md',
    desc: 'small 24 / default 32 / middle 40 / large 48；未声明高度时请目测核对。',
    test(d) {
      if (!isBtn(d.selector)) return;
      if (d.prop === 'height') {
        if (!BTN_HEIGHT.has(d.value)) return `按钮高度 ${d.value} 不在四档 24/32/40/48`;
      }
      if (d.prop === 'padding') {
        const v = d.value.split(' ');
        const tb = v.length <= 2 ? v[0] : v[0];
        const p = px(tb);
        // 上下 padding + 字号 ≈ 高度，粗校：上下 padding 应为 2/4/6/8 附近
        if (p !== undefined && ![0,2,4,6,8,10,12].includes(Number(p)))
          return `按钮上下 padding ${tb} 疑似不在四档节奏（24/32/40/48 − 行高）`;
      }
    },
  },
  {
    id: 'R5', level: 'warn', title: '按钮底色', doc: 'components/buttons.md',
    desc: '主按钮 #191919；深底楼层（通栏广告/黑底）主按钮 #FFFFFF；次按钮用描边 #595959。',
    test(d) {
      if (!isBtn(d.selector)) return;
      if (d.prop !== 'background' && d.prop !== 'background-color') return;
      const base = d.value.split(' ')[0].toLowerCase();
      if (BTN_BG_OK.has(base) || base.startsWith('linear') || /var\(|gradient/.test(d.value)) return;
      // hover/按压态允许黑/白/主色基的 rgba 透明变体（禁用背景 rgba(0,0,0,.05) 即规范值）
      const rm = d.value.match(/rgba?\(([\d\s,.]+)\)/);
      if (rm) {
        const ch = rm[1].split(',').map(s => s.trim());
        if (['0,0,0', '255,255,255', '25,25,19', '25,25,25'].includes(`${ch[0]},${ch[1]},${ch[2]}`)) return;
      }
      return `按钮底色 ${d.value} 不合规（应为 #191919 / #FFFFFF / 透明+描边；hover 可用黑/白透明变体）`;
    },
  },
  {
    id: 'R6', level: 'error', title: '禁止删除线', doc: 'components/price.md',
    desc: '设计稿 18289 节点中删除线 0 处；原价靠「原价」前缀 + 字号降两档表达，禁止 line-through。',
    test(d) {
      if (d.prop !== 'text-decoration' && d.prop !== 'text-decoration-line') return;
      if (/line-through/i.test(d.value)) return '出现 line-through —— 规范中原价不划线';
    },
  },
  {
    id: 'R7', level: 'warn', title: '间距 4px 栅格', doc: 'tokens/spacing.md',
    desc: 'gap/padding 应落在 4px 栅格（76/160/164/52/32/28/24/16 等实测值均满足）。',
    test(d) {
      if (!/^(gap|row-gap|column-gap|padding|padding-(top|right|bottom|left)|margin|margin-(top|right|bottom|left))$/.test(d.prop)) return;
      if (/var\(|%|auto|calc|em|rem/.test(d.value)) return;
      const parts = d.value.split(' ');
      for (const p of parts) {
        const n = px(p) ?? num(p);
        if (n !== undefined && Number(n) !== 0 && Number(n) % 4 !== 0)
          return `${d.prop}: ${d.value} 中 ${p} 不在 4px 栅格`;
      }
    },
  },
  {
    id: 'R8', level: 'info', title: '内容区宽度', doc: 'tokens/spacing.md',
    desc: '1920 楼层内容区 1600（优势楼层 1592、通栏广告 1008、门户 1280）；1200~1700 内的显式宽度请人工核对。',
    test(d) {
      if (d.prop !== 'width' && d.prop !== 'max-width') return;
      if (!/px$/.test(d.value) || /var\(|calc/.test(d.value)) return;
      const n = Number(px(d.value));
      if (n >= 1200 && n <= 1700 && !FLOOR_CONTENT_WIDTH.has(d.value))
        return `宽度 ${d.value} 处于内容区档位范围，但不是规范值 1600/1592/1280/1008，请核对`;
    },
  },
  {
    id: 'R9', level: 'warn', title: 'z-index 层级', doc: 'tokens/level.md',
    desc: '吸顶层级 900 为上限；出现 >900 的层级请核对 tokens/level.md。',
    test(d) {
      if (d.prop !== 'z-index') return;
      const n = Number(num(d.value) ?? px(d.value));
      if (!Number.isNaN(n) && n > 900) return `z-index ${n} 超过吸顶层 900`;
    },
  },
  {
    id: 'R10', level: 'warn', title: '字族首选', doc: 'tokens/typography.md',
    desc: '首选 HarmonyOS Sans，兜底 PingFang SC / Microsoft YaHei / sans-serif。',
    test(d) {
      if (d.prop !== 'font-family') return;
      if (!FONT_FAMILY_OK.test(d.value)) return `字族 "${d.value}" 首选应为 HarmonyOS Sans 系`;
    },
  },
];

/* ---------------- 主流程 ---------------- */
const args = process.argv.slice(2);
const input = args.find(a => !a.startsWith('-'));
const outIdx = args.indexOf('-o');
const outPath = outIdx > -1 ? args[outIdx + 1] : null;
if (!input) {
  console.error('用法: node check.mjs <page.html> [-o report.html]');
  process.exit(1);
}
const html = fs.readFileSync(input, 'utf8');
const decls = [];
let i = 0;
const html2 = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, css) => {
  decls.push(...parseCss(css, `<style>#${++i}`));
  return '';
});
decls.push(...parseInline(html2));

const findings = [];
for (const d of decls) {
  for (const rule of RULES) {
    try {
      const msg = rule.test(d);
      if (msg) findings.push({ rule, d, msg });
    } catch (e) { /* 规则内部异常不阻断 */ }
  }
}

/* 覆盖度统计：规则是否有可校验样本 */
const coverage = RULES.map(r => {
  const sample = {
    R1: /^(color|background|border)/, R2: /^font-size$/, R3: /^border-radius$/,
    R4: /^(height|padding)$/, R5: /^background(-color)?$/, R6: /^text-decoration/,
    R7: /^(gap|padding|margin)/, R8: /^(width|max-width)$/, R9: /^z-index$/, R10: /^font-family$/,
  }[r.id];
  const n = decls.filter(d => sample.test(d.prop)).length;
  return { id: r.id, title: r.title, samples: n };
});

/* 控制台摘要 */
const cnt = { error: 0, warn: 0, info: 0 };
for (const f of findings) cnt[f.rule.level]++;
console.log(`\n■ huawei-cloud-web-ui-check  「${path.basename(input)}」`);
console.log(`  解析声明 ${decls.length} 条 → 问题 error ${cnt.error} / warn ${cnt.warn} / info ${cnt.info}`);
const byRule = {};
for (const f of findings) (byRule[f.rule.id] ??= []).push(f);
for (const r of RULES) {
  const list = byRule[r.id] || [];
  console.log(`  ${r.id} ${r.title.padEnd(6, '　')} ${list.length ? '✖ ' + list.length : list.length === 0 && coverage.find(c => c.id === r.id).samples ? '✔' : '— 0样本'}`);
  for (const f of list.slice(0, 8)) console.log(`      [${f.d.src}${f.d.bp !== 'all' && f.d.bp !== 'inline' ? ' @' + f.d.bp : ''}] ${f.d.selector} → ${f.d.prop}: ${f.d.value}  ⇒ ${f.msg}`);
  if (list.length > 8) console.log(`      … 其余 ${list.length - 8} 条见报告`);
}

/* HTML 报告 */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const LV_COLOR = { error: '#f23030', warn: '#ff8800', info: '#1476ff' };
const rows = RULES.map(r => {
  const list = byRule[r.id] || [];
  const cov = coverage.find(c => c.id === r.id);
  const body = list.map(f => `
    <tr>
      <td><span class="lv" style="background:${LV_COLOR[f.rule.level]}">${f.rule.level}</span></td>
      <td class="mono">${esc(f.d.src)}${f.d.bp !== 'all' && f.d.bp !== 'inline' ? '<br><span class="dim">@media ' + esc(f.d.bp) + '</span>' : ''}</td>
      <td class="mono">${esc(f.d.selector)}</td>
      <td class="mono">${esc(f.d.prop)}: <b>${esc(f.d.value)}</b></td>
      <td>${esc(f.msg)}</td>
      <td class="dim">${esc(r.desc)}</td>
      <td class="mono dim">${esc(r.doc)}</td>
    </tr>`).join('');
  return `
  <section>
    <h2>${r.id} ${esc(r.title)} <span class="badge ${list.length ? 'bad' : cov.samples ? 'ok' : 'na'}">${list.length ? list.length + ' 项' : cov.samples ? '通过' : '0 样本'}</span></h2>
    <p class="dim">${esc(r.desc)}　出处 <code>${esc(r.doc)}</code></p>
    ${body ? `<table><tr><th>级别</th><th>位置</th><th>选择器</th><th>声明</th><th>判定</th><th>说明</th><th>规范出处</th></tr>${body}</table>` : ''}
  </section>`;
}).join('');

const covRows = coverage.map(c => `<tr><td class="mono">${c.id}</td><td>${esc(c.title)}</td><td>${c.samples}</td></tr>`).join('');
const report = `<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><title>UX 规范校验报告 — ${esc(path.basename(input))}</title>
<style>
body{font-family:HarmonyOS Sans,PingFang SC,Microsoft YaHei,sans-serif;color:#191919;max-width:1280px;margin:24px auto;padding:0 24px;background:#fff}
h1{font-size:24px} .dim{color:#595959;font-size:12px} .mono{font-family:Consolas,monospace;font-size:12px}
table{border-collapse:collapse;width:100%;margin:8px 0 24px}
th,td{border:1px solid #dbdbdb;padding:6px 10px;text-align:left;vertical-align:top;font-size:13px}
th{background:#f5f5f5}
.lv{color:#fff;border-radius:4px;padding:1px 8px;font-size:12px}
.badge{border-radius:50px;padding:2px 12px;font-size:12px;margin-left:8px}
.badge.ok{background:#5cb300;color:#fff}.badge.bad{background:#f23030;color:#fff}.badge.na{background:#dbdbdb;color:#595959}
h2{font-size:16px;margin:24px 0 4px}
.sum{display:flex;gap:16px;margin:16px 0}
.sum div{border-radius:16px;padding:12px 24px;color:#fff;font-size:20px}
</style></head><body>
<h1>UX 规范校验报告 <span class="dim">huawei-cloud-web-ui-check v1.0.0</span></h1>
<p>页面：<b>${esc(input)}</b> ｜ 解析声明 <b>${decls.length}</b> 条（${decls.filter(d=>d.bp==='inline').length} inline）｜ 生成于 ${new Date().toLocaleString('zh-CN')}</p>
<div class="sum">
  <div style="background:#f23030">error ${cnt.error}</div>
  <div style="background:#ff8800">warn ${cnt.warn}</div>
  <div style="background:#1476ff">info ${cnt.info}</div>
</div>
<h2>覆盖度</h2>
<table><tr><th>规则</th><th>维度</th><th>可校验样本数</th></tr>${covRows}</table>
${rows}
<p class="dim">静态校验只覆盖 CSS 声明层；结构级校验（楼层组合、卡片排布数、按钮组行为等）请配合 references/checklists/ 三份清单人工核对。</p>
</body></html>`;

const rp = outPath || input.replace(/\.html?$/i, '') + '.check-report.html';
fs.writeFileSync(rp, report);
console.log(`  报告 → ${rp}\n`);
