/**
 * Split a multiline CMS text field into paragraphs on blank lines, so editors
 * can write multiple paragraphs in a plain text widget without markdown.
 */
export function paragraphs(text: string): string[] {
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Turn a human-formatted phone number ("09/385.67.82", "09 385 67 82") into a
 * valid tel: URI — editors type any common Belgian format in the CMS.
 */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}

/**
 * True when the value looks like a real e-mail address. Non-empty values that
 * are not addresses render as plain text instead of a broken mailto: link
 * (so a typo stays visible) and are omitted from the structured data.
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
