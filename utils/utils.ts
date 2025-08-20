export function ellipsify({ text, length }: { text: string; length: number }) {
  if (text.length <= length) {
    return text;
  } else {
    return text.slice(0, length) + '...';
  }
}
