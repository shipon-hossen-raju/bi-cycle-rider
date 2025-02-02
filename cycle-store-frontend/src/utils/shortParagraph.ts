export default function shortParagraph(text: string, count: number) {
  return text.length > count ? `${text.substring(0, count)}...` : text;
}
