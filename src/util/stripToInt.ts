export const stripToInt = (input: string): number | null => {
  input = input.replace(/\D/g,'');
  const number = parseInt(input);
  return number ? number : null;
};
