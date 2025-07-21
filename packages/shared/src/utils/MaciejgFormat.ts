/**
 * Maciejg format conversion utilities
 */

// Legal characters that FICS accepts (ASCII printable + newline + tab)
const LEGAL_CHARACTERS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n\t\r';

/**
 * Converts Unicode to Maciejg format for outgoing text
 * This is applied to user-entered text before sending to FICS
 */
export function unicodeToMaciejgFormat(message: string): string {
  let result = '';
  
  for (let i = 0; i < message.length; i++) {
    const char = message.charAt(i);
    const charCode = char.charCodeAt(0);
    
    if (LEGAL_CHARACTERS.indexOf(char) !== -1) {
      // Legal ASCII character, keep as-is
      result += char;
    } else if (charCode > 256) {
      // Unicode character, convert to Maciejg format
      const hexString = charCode.toString(16);
      result += `&#x${hexString};`;
    }
    // Illegal characters (128-255) are dropped
  }
  
  return result;
}

/**
 * Converts Maciejg format to Unicode for incoming text
 * This is applied to text received from FICS after timeseal handling
 */
export function maciejgFormatToUnicode(inputString: string): string {
  let result = inputString;
  let startIndex = 0;
  
  while ((startIndex = result.indexOf('&#x', startIndex)) !== -1) {
    const endIndex = result.indexOf(';', startIndex);
    
    if (endIndex !== -1 && (endIndex - startIndex) <= 8) {
      const unicodeHex = result.substring(startIndex + 3, endIndex).toUpperCase();
      
      try {
        const intValue = parseInt(unicodeHex, 16);
        const replacement = String.fromCharCode(intValue);
        
        // Replace the entire &#x....; sequence with the Unicode character
        result = result.substring(0, startIndex) + replacement + result.substring(endIndex + 1);
        
        // Move past the replacement character
        startIndex += replacement.length;
      } catch (e) {
        // If parsing fails, skip this sequence
        startIndex = endIndex + 1;
      }
    } else {
      // Invalid sequence, move past it
      startIndex += 3;
    }
  }
  
  return result;
}