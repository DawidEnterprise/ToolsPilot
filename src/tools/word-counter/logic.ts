/**
 * Word counter logic — pure functions, no React dependency.
 */

export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  longestWord: string;
  averageWordLength: number;
}

const WORDS_PER_MINUTE_READING = 238;
const WORDS_PER_MINUTE_SPEAKING = 150;

export function analyzeText(input: string): TextStats {
  if (!input.trim()) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      longestWord: "",
      averageWordLength: 0,
    };
  }

  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, "").length;

  const wordMatches = input.trim().split(/\s+/).filter(Boolean);
  const words = wordMatches.length;

  const sentences = (input.match(/[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0);
  const paragraphs = input.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (words > 0 ? 1 : 0);

  const readingTimeMinutes = words / WORDS_PER_MINUTE_READING;
  const speakingTimeMinutes = words / WORDS_PER_MINUTE_SPEAKING;

  const longestWord = wordMatches.reduce(
    (longest, w) => (w.length > longest.length ? w : longest),
    ""
  );

  const averageWordLength =
    words > 0 ? wordMatches.reduce((sum, w) => sum + w.length, 0) / words : 0;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    longestWord,
    averageWordLength,
  };
}
