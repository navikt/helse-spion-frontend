export const stripToInt = (input: string): number | null => {
  input = input.replace(/\D/g,'');
  return parseInt(input);
};
