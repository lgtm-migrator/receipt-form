import { ColorTypes, PDFPageDrawTextOptions } from 'pdf-lib';

export const positionText = (x: number, y: number): PDFPageDrawTextOptions => ({
  x,
  y,
  size: 14,
  color: {
    type: ColorTypes.RGB,
    red: 0,
    green: 0,
    blue: 0,
  },
});

const MAX_CHAR_LENGTH = 65;

/**
 * Converts a single line string to array of strings of maxCharLength
 */
export const createMultiLine = (text: string): string => {
  const multiLine = [];

  /* Break each of the original lines by themselves */
  const lines = text.split('\n');
  for (const line of lines) {
    let currentLine = '';
    /* Assemble each word from the line if they still fit */
    const words = line.split(' ');
    for (const word of words) {
      /* In case a word is longer we treat it as its own line */
      if (word.length >= MAX_CHAR_LENGTH) {
        multiLine.push(currentLine);
        currentLine = '';
        multiLine.push(word);
      } else {
        if (currentLine.length + word.length < MAX_CHAR_LENGTH) {
          currentLine += currentLine === '' ? word : ` ${word}`;
        } else {
          multiLine.push(currentLine);
          currentLine = word;
        }
      }
    }
    multiLine.push(currentLine);
  }
  return multiLine.join('\n');
};
