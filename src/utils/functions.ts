export const sliceDescription = (
  text: string | undefined,
  maxLength: number
) => {
  if (!text) return ""; // Return an empty string if text is undefined
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
