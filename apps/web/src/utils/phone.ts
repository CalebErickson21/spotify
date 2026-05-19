/** Non-digits removed; not capped. */
function digitSlice(input: string): string {
  return input.replace(/\D/g, '');
}

/**
 * From pasted or typed text (including our "+1 (###)…" field value), derive up to 10
 * national digits for storage. Strips one leading `1` when present so the visible `+1`
 * is not stored as part of the number (NANP national numbers do not start with 1).
 */
export function parseRawDigits(input: string): string {
  let d = digitSlice(input);
  if (d.startsWith('1')) d = d.slice(1);
  return d.slice(0, 10);
}

/** Display: cosmetic `+1` plus grouping for stored raw digits (0–10 digits only). */
export function formatPhoneDisplay(rawDigits: string): string {
  const n = digitSlice(rawDigits).slice(0, 10);
  if (!n.length) return '+1 ';
  if (n.length < 4) return `+1 (${n}`;
  if (n.length < 7) return `+1 (${n.slice(0, 3)}) ${n.slice(3)}`;
  return `+1 (${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
}

/** API payload: `+1` plus stored raw digits (max 10 digit characters). */
export function formatPhoneApi(rawDigits: string): string {
  return `+1${digitSlice(rawDigits).slice(0, 10)}`;
}
