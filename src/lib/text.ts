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
