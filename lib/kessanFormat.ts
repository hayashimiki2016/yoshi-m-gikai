export function formatYenOku(yen: number): string {
  const oku = Math.floor(yen / 100_000_000);
  const man = Math.round((yen % 100_000_000) / 10_000);
  if (oku === 0) {
    return `約${man.toLocaleString("ja-JP")}万円`;
  }
  if (man === 0) {
    return `約${oku.toLocaleString("ja-JP")}億円`;
  }
  return `約${oku.toLocaleString("ja-JP")}億${man.toLocaleString("ja-JP")}万円`;
}
