const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "ac", "ante", "bibendum",
  "at", "varius", "vel", "pharetra", "diam", "massa", "sapien", "faucibus",
  "scelerisque", "eleifend", "donec", "pretium", "vulputate", "maecenas",
  "accumsan", "lacus", "viverra", "vitae", "congue", "eu", "pellentesque",
  "habitant", "morbi", "tristique", "senectus", "netus", "malesuada", "fames",
  "turpis", "egestas", "integer", "feugiat", "nisl", "praesent", "semper",
  "tincidunt", "cras", "pulvinar", "mattis", "nunc"
];

const FIRST_SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({ length: len }, () => randomWord());
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

export function generateParagraph(): string {
  const sentenceCount = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(" ");
}

export function generateLorem(paragraphs: number, startWithLorem: boolean): string {
  const result: string[] = [];
  for (let i = 0; i < paragraphs; i++) {
    if (i === 0 && startWithLorem) {
      result.push(FIRST_SENTENCE + " " + generateParagraph());
    } else {
      result.push(generateParagraph());
    }
  }
  return result.join("\n\n");
}
