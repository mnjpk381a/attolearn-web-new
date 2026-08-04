"use client";

import React from "react";
import { BlockMath, InlineMath } from "react-katex";

export function trimStr(s?: string | null) {
  return (s || "").trim();
}

export function stripHtmlTags(s?: string | null) {
  if (!s) return "";
  return String(s).replace(/<[^>]*>/g, "");
}

export function clonePaper<T>(paper: T): T {
  return JSON.parse(JSON.stringify(paper));
}

/**
 * KaTeX treats `iv`, `vi`, etc. inside `\\(…\\)` as separate variables, which looks like wrong
 * sub-question numbering. Only [ivxlcdm] tokens are treated as plain labels here.
 */
export function isLikelyRomanNumeralLabel(s: string): boolean {
  const t = s.trim().replace(/\.$/, "").trim();
  if (!t || t.length > 10) return false;
  return /^[ivxlcdm]+$/i.test(t);
}

/**
 * Remove embedded sub-part labels at line starts (e.g. `i.`, `(vi)`) so the paper index from
 * `toRomanLower` is not duplicated or confused with in-stem markers. SQ/LQ display only.
 */
export function stripEmbeddedSubquestionMarkers(text: string): string {
  if (!text) return text;
  return text.replace(
    /(^|[\r\n])\s*(?:\(([ivxlcdm]{1,8})\)\s+|([ivxlcdm]{1,8})\s*[.)]\s+)/gi,
    "$1",
  );
}

export function renderSQOrLQDisplayText(
  text: string | null | undefined,
): React.ReactNode {
  const cleaned = stripEmbeddedSubquestionMarkers(
    stripHtmlTags(trimStr(text)),
  );
  return renderLatex(cleaned || null);
}

/** Renders `\[…\]` as block math and `\(…\)` as inline math; rest as plain text. */
export function renderLatex(text: string | null | undefined): React.ReactNode {
  const source = stripHtmlTags(text);
  if (!source) return null;

  const blockRegex = /(\\\[(?:.|\n)*?\\\])/g;
  const blocks = source.split(blockRegex);

  return blocks.map((block, i) => {
    if (!block) return null;

    if (block.startsWith("\\[")) {
      const math = block.replace(/^\\\[|\\\]$/g, "").trim();
      if (isLikelyRomanNumeralLabel(math)) {
        return (
          <span key={i} className="block my-2 w-full whitespace-pre-wrap">
            {math}
          </span>
        );
      }
      return (
        <span key={i} className="block my-2 w-full">
          <BlockMath math={math} />
        </span>
      );
    }

    const inlineRegex = /(\\\((?:.|\n)*?\\\))/g;
    const parts = block.split(inlineRegex);

    return (
      <span key={i} className="whitespace-pre-wrap">
        {parts.map((part, j) => {
          if (!part) return null;

          if (part.startsWith("\\(")) {
            const math = part.replace(/^\\\(|\\\)$/g, "").trim();
            if (isLikelyRomanNumeralLabel(math)) {
              return <span key={`${i}-${j}`}>{math}</span>;
            }
            return <InlineMath key={`${i}-${j}`} math={math} />;
          }

          return <span key={`${i}-${j}`}>{part}</span>;
        })}
      </span>
    );
  });
}

/** Demo / print header row values stored on `testPaperDet` when user edits the table. */
export function testPaperDetHeaderValue(
  det: any,
  field: string,
  fallback: string,
): string {
  if (!det || !Object.prototype.hasOwnProperty.call(det, field)) {
    return fallback;
  }
  const v = det[field];
  if (v === null || v === undefined) return "";
  return stripHtmlTags(String(v));
}
/** Paper uses stacked EN + UR when API/mapping provides both stems. */
export function isPaperBilingual(paper: any): boolean {
  if (!paper) return false;
  const det = paper.testPaperDet || {};
  const modes = `${det.paperLangMode || ""} ${det.savedPaperLangMode || ""} ${
    det.renderPaperLangMode || ""
  }`.toLowerCase();
  if (modes.includes("bilingual")) return true;
  const rows = [
    ...(paper.mcQsList || []),
    ...(paper.sQsList || []),
    ...(paper.lQsList || []),
  ];
  return rows.some((q: any) => {
    const en = trimStr(q?.questionTextEnglish);
    const ur = trimStr(q?.questionTextUrdu);
    return Boolean(en && ur && en !== ur);
  });
}

export function isPaperEnglish(paper: any): boolean {
  if (!paper) return false;
  const det = paper.testPaperDet || {};
  const modes = `${det.paperLangMode || ""} ${det.savedPaperLangMode || ""} ${
    det.renderPaperLangMode || ""
  }`.toLowerCase();
  if (!modes) return false;
  if (modes.includes("urdu")) return false;
  return modes.includes("english") || modes.includes("en");
}

export function questionEnglishLine(q: any): string {
  const en = trimStr(q?.questionTextEnglish);
  if (en) return en;
  const t = trimStr(q?.questionText);
  if (t.includes(" / ")) return t.split(" / ")[0]!.trim();
  return t;
}

export function questionUrduLine(q: any): string {
  const ur = trimStr(q?.questionTextUrdu);
  if (ur) return ur;
  const t = trimStr(q?.questionText);
  if (t.includes(" / ")) return t.split(" / ").slice(1).join(" / ").trim();
  return "";
}

export function isQuestionBilingual(q: any): boolean {
  const en = questionEnglishLine(q);
  const ur = questionUrduLine(q);
  return Boolean(en && ur);
}

export function optionEnglish(q: any, opt: string): string {
  const enK = `option${opt}English` as keyof typeof q;
  const fall = `option${opt}` as keyof typeof q;
  return trimStr((q?.[enK] as string) || (q?.[fall] as string));
}

export function optionUrdu(q: any, opt: string): string {
  const u = trimStr(q?.[`option${opt}Urdu` as keyof typeof q] as string);
  const e = optionEnglish(q, opt);
  if (u && e && u === e) return "";
  return u;
}

export function mcqOptionGridOrder(
  urColumn: boolean,
): readonly ("A" | "B" | "C" | "D")[] {
  return urColumn
    ? (["B", "A", "D", "C"] as const)
    : (["A", "B", "C", "D"] as const);
}

export function optionUrduOrFallback(q: any, opt: string): string {
  const u = optionUrdu(q, opt);
  return u || optionEnglish(q, opt);
}

export function toRomanLower(n: number) {
  const num = Math.floor(Number(n));
  if (!Number.isFinite(num) || num <= 0) return "";
  const map: Array<[number, string]> = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let x = num;
  let out = "";
  for (const [value, roman] of map) {
    while (x >= value) {
      out += roman;
      x -= value;
    }
  }
  return out.toLowerCase();
}
