#!/usr/bin/env node
// Fails when a theme's stylesheet or template uses a left/right (physical) direction where a right-to-left language needs the
// logical one. Usage (no host Node: run it in a container):
//   docker run --rm -v "$PWD":/w -w /w node:22 node scripts/check-rtl.mjs
// Add a comment `rtl-ok` on a line that is deliberately physical (a centring trick, a honeypot kept off-screen).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const RULES = [
  [/(?<![-\w])(margin|padding)-(left|right)\s*:/, "use margin-inline-start/end or padding-inline-start/end"],
  [/(?<![-\w])border-(left|right)(-width|-color|-style)?\s*:/, "use border-inline-start/end"],
  [/(?<![-\w.])(left|right)\s*:\s*[-0-9c]/, "use inset-inline-start/end"],
  [/text-align\s*:\s*(left|right)/, "use text-align: start/end"],
  [/float\s*:\s*(left|right)/, "use float: inline-start/end"],
  [/(?<![-\w])border-radius\s*:\s*\S+ \S+ \S+( \S+)?\s*;/, "give each corner with border-start-start-radius etc. when the corners differ"],
  [/(?<![-\w:])(m|p)(l|r)-\d|(?<![-\w])text-(left|right)\b|(?<![-\w])(float|rounded|border)-(l|r)\b/, "use ms-/me-/ps-/pe-/text-start/text-end"],
];

export function scan(text) {
  const found = [];
  text.split(/\r?\n/).forEach((line, i) => {
    if (/rtl-ok/.test(line)) return;
    if (/left:\s*50%|translateX|-10000px|position:\s*fixed;top:0;left:0/.test(line)) return;
    for (const [re, hint] of RULES) {
      if (!re.test(line)) continue;
      if (/border-radius/.test(line) && !asymmetricRadius(line)) continue;
      found.push({ line: i + 1, hint, text: line.trim().slice(0, 120) });
    }
  });
  return found;
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (["node_modules", ".nuxt", ".output", "dist", ".git"].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(vue|css|scss)$/.test(name)) out.push(p);
  }
  return out;
}

if (process.argv[1]?.endsWith("check-rtl.mjs")) {
  let bad = 0;
  for (const dir of process.argv.slice(2).length ? process.argv.slice(2) : ["."]) {
    for (const file of walk(dir)) {
      if (file.includes("docs")) continue;
      for (const f of scan(readFileSync(file, "utf8"))) {
        bad++;
        console.log(`${file}:${f.line}  ${f.hint}\n    ${f.text}`);
      }
    }
  }
  console.log(bad ? `\n${bad} physical direction(s) found` : "no physical directions found");
  process.exit(bad ? 1 : 0);
}

function asymmetricRadius(line) {
  const value = line.match(/border-radius:\s*([^;]+)/)?.[1].split("/")[0].trim().split(/\s+/) ?? [];
  if (value.length < 2 || value.some((v) => v.includes("("))) return false;
  const [tl, tr = tl, br = tl, bl = tr] = value;
  return tl !== tr || bl !== br;
}
