export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: { month: number; principal: number; interest: number; balance: number }[];
}

export function calculateLoan(
  principal: number,
  annualRate: number,
  termMonths: number
): LoanResult {
  if (principal <= 0 || termMonths <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, schedule: [] };
  }

  if (annualRate === 0) {
    const monthlyPayment = principal / termMonths;
    const schedule = Array.from({ length: Math.min(termMonths, 360) }, (_, i) => ({
      month: i + 1,
      principal: monthlyPayment,
      interest: 0,
      balance: principal - monthlyPayment * (i + 1),
    }));
    return { monthlyPayment, totalPayment: principal, totalInterest: 0, schedule };
  }

  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - principal;

  const schedule: LoanResult["schedule"] = [];
  let balance = principal;
  for (let i = 0; i < Math.min(termMonths, 360); i++) {
    const interest = balance * monthlyRate;
    const principalPart = monthlyPayment - interest;
    balance -= principalPart;
    schedule.push({
      month: i + 1,
      principal: principalPart,
      interest,
      balance: Math.max(balance, 0),
    });
  }

  return { monthlyPayment, totalPayment, totalInterest, schedule };
}
