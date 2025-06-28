export function toId(value:string, config: {
  maxLength: number
}) {
  const maxLength = config.maxLength;
  const len = value.length;

  let result = '';
  let lastCharWasSpace = true;

  // Step 1: Normalize the input string
  for (let i = 0; i < len; i++) {
    if (maxLength > 0 && result.length >= maxLength) break;

    const char = value[i];
    const charCode = char.charCodeAt(0);

    // Check if character is valid (a-z, A-Z, 0-9)
    if ((charCode >= 48 && charCode <= 57) || // 0-9
        (charCode >= 65 && charCode <= 90) || // A-Z
        (charCode >= 97 && charCode <= 122)) { // a-z
      // Convert uppercase to lowercase

      if (charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(charCode + 32); // Convert to lowercase
      } else {
        result += char;

      }
      lastCharWasSpace = false;
    } else {
      // Handle spaces for invalid characters
      if (!lastCharWasSpace) {
        result += ' ';
        lastCharWasSpace = true;
      }
    }
  }

  // Step 2: Process words and construct the ID
  const words = result.split(' ');
  const wordCount = words.length;
  let id = '';
  let buffer = '';

  for (let i = 0; i < wordCount; i++) {
    const word = words[i];
    if (word.length > 1) {
      if (buffer) {
        id += buffer + '_';
        buffer = '';
      }
      id += word;
      if (i < wordCount - 1) id += '_';
    } else {
      buffer += word;
    }
  }

  if (buffer) id += buffer;

  return id.replace(/_$/, '');
}
