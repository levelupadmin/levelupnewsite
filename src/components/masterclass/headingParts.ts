/**
 * Splits "What you'll *know* how to do" into plain and gold parts, so a
 * heading prop can mark a few words for the gold gradient without HTML.
 */
export function headingParts(text: string): { text: string; gold: boolean }[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), gold: true }
        : { text: part, gold: false }
    );
}

/** Stable id for aria-labelledby, from the section id or the heading text. */
export function headingId(id: string | undefined, heading: string | undefined, fallback: string): string {
  const base = id || (heading ?? fallback).replace(/\*/g, "");
  return (
    "mck-h-" +
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48)
  );
}
