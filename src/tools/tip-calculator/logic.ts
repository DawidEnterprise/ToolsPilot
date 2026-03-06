export interface TipResult {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
  tipPerPerson: number;
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  splitCount: number
): TipResult {
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / Math.max(splitCount, 1);
  const tipPerPerson = tipAmount / Math.max(splitCount, 1);

  return { tipAmount, totalAmount, perPerson, tipPerPerson };
}
